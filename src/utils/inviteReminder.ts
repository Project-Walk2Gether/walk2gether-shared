/**
 * Computes when (if ever) the single "+24h after invite" reminder for a walk
 * invitation should fire, applying the agreed rules:
 *
 *  1. Base time = inviteTime + 24h.
 *  2. Quiet hours — if that lands at night (22:00–08:00 in the invitee's local
 *     timezone), defer to 08:00 local, then re-check the cap.
 *  3. 24h cap — if the (possibly deferred) time lands less than 24h before the
 *     walk, it's inside the planning dead-zone, so skip entirely (return null).
 *
 * Pure and timezone-aware; reused by both enqueue-on-invite and
 * re-enqueue-on-reschedule. Returns the fire time, or null if the reminder
 * should not be sent at all.
 */

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export const QUIET_HOURS_START = 22; // 10pm
export const QUIET_HOURS_END = 8; // 8am
export const INVITE_REMINDER_DELAY_MS = DAY_MS; // +24h after invite
export const INVITE_REMINDER_CAP_MS = DAY_MS; // must land ≥24h before the walk

interface LocalParts {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number; // 0-23
  minute: number;
}

/**
 * Returns the wall-clock components of `date` as seen in the given IANA timezone.
 */
function getLocalParts(date: Date, timeZone: string): LocalParts {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const map: Record<string, string> = {};
  for (const part of dtf.formatToParts(date)) {
    if (part.type !== "literal") map[part.type] = part.value;
  }
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    // Intl can emit "24" for midnight in some environments — normalize to 0.
    hour: Number(map.hour) % 24,
    minute: Number(map.minute),
  };
}

/**
 * The timezone offset (localWallClock - actualUTC) in ms at the given instant.
 */
function getOffsetMs(date: Date, timeZone: string): number {
  const p = getLocalParts(date, timeZone);
  const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  // Round actual time down to the minute to match the parts' resolution.
  const actualMinute = Math.floor(date.getTime() / 60000) * 60000;
  return asUTC - actualMinute;
}

/**
 * Converts a desired local wall-clock time (in `timeZone`) to the corresponding
 * UTC instant. Day/month overflow is handled by Date.UTC (e.g. day 32 → next
 * month). One offset correction handles all non-DST-transition cases.
 */
function zonedWallClockToUtc(
  year: number,
  month: number, // 1-12
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const offset = getOffsetMs(new Date(guess), timeZone);
  return new Date(guess - offset);
}

function isQuietHour(hour: number): boolean {
  return hour >= QUIET_HOURS_START || hour < QUIET_HOURS_END;
}

/**
 * @param inviteAt  When the invitation was created.
 * @param walkDate  When the walk starts.
 * @param timeZone  Invitee's IANA timezone (e.g. "America/New_York").
 * @returns The instant the reminder should fire, or null to skip it.
 */
export function computeInviteReminderTime(
  inviteAt: Date,
  walkDate: Date,
  timeZone: string,
): Date | null {
  const tz = timeZone || "UTC";

  let fireTime = new Date(inviteAt.getTime() + INVITE_REMINDER_DELAY_MS);

  // Quiet-hours deferral.
  const local = getLocalParts(fireTime, tz);
  if (isQuietHour(local.hour)) {
    // Late night (>= 22:00) defers to 08:00 the next local day; early morning
    // (< 08:00) defers to 08:00 the same local day.
    const deferDay = local.hour >= QUIET_HOURS_END ? local.day + 1 : local.day;
    fireTime = zonedWallClockToUtc(
      local.year,
      local.month,
      deferDay,
      QUIET_HOURS_END,
      0,
      tz,
    );
  }

  // 24h cap — skip if it would land inside the dead-zone (< 24h before walk,
  // inclusive of exactly the T-24h boundary).
  if (fireTime.getTime() >= walkDate.getTime() - INVITE_REMINDER_CAP_MS) {
    return null;
  }

  return fireTime;
}
