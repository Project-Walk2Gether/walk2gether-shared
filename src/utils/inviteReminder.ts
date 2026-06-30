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

import { getLocalParts, zonedWallClockToUtc } from "./timezone";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export const QUIET_HOURS_START = 22; // 10pm
export const QUIET_HOURS_END = 8; // 8am
export const INVITE_REMINDER_DELAY_MS = DAY_MS; // +24h after invite
export const INVITE_REMINDER_CAP_MS = DAY_MS; // must land ≥24h before the walk

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
