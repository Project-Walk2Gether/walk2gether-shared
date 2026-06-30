/**
 * Expands a user's weekly Availability into concrete, dated time slots between
 * two instants. Used when a walk is created in "availability" scheduling mode:
 * the creator's recurring windows become a list of pickable slots, each an
 * absolute UTC instant (rendered in the invitee's timezone at selection time).
 *
 * Pure and timezone/DST-aware via zonedWallClockToUtc. Honors one-off
 * exceptions (an exception with empty windows means "unavailable that date").
 */

import { Availability, AvailabilityWindow } from "../schemas/availability";
import { getLocalParts, zonedWallClockToUtc } from "./timezone";

export interface ExpandedSlot {
  start: Date;
  end: Date;
}

interface PlainWindow {
  startMinutes: number;
  endMinutes: number;
}

/** Minimal shape we need from a timestamp-like value (Firestore Timestamp or Date). */
type TimestampLike = { toDate(): Date } | Date;

function toDate(value: TimestampLike): Date {
  return value instanceof Date ? value : value.toDate();
}

function sameLocalDate(
  a: { year: number; month: number; day: number },
  b: { year: number; month: number; day: number },
): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

/**
 * @param availability  The user's availability (windows, exceptions, timezone).
 * @param from          Earliest instant a slot may start (inclusive). Slots that
 *                      would start before this are skipped (e.g. "now").
 * @param to            Slots must start strictly before this instant.
 * @param slotMinutes   Length of each generated slot. Each window is sliced into
 *                      back-to-back slots; a trailing remainder shorter than
 *                      slotMinutes is dropped.
 */
export function expandAvailabilityToSlots(
  availability: Availability,
  from: Date,
  to: Date,
  slotMinutes: number,
): ExpandedSlot[] {
  const { timezone, windows = [], exceptions = [] } = availability;
  if (slotMinutes <= 0 || from >= to) return [];

  // Pre-index exceptions by their local calendar date in the availability tz.
  const exceptionByDate = new Map<string, PlainWindow[]>();
  for (const exc of exceptions) {
    const parts = getLocalParts(toDate(exc.date), timezone);
    const key = `${parts.year}-${parts.month}-${parts.day}`;
    exceptionByDate.set(
      key,
      (exc.windows ?? []).map((w) => ({
        startMinutes: w.startMinutes,
        endMinutes: w.endMinutes,
      })),
    );
  }

  const slots: ExpandedSlot[] = [];

  // Walk each local calendar day in [from, to]. Start one day early so a window
  // whose UTC slot lands inside the range despite the local date sitting just
  // before `from` is still considered.
  const startParts = getLocalParts(from, timezone);
  let cursor = new Date(
    Date.UTC(startParts.year, startParts.month - 1, startParts.day),
  );
  cursor.setUTCDate(cursor.getUTCDate() - 1);
  const guard = new Date(to.getTime() + 2 * 24 * 60 * 60 * 1000);

  while (cursor <= guard) {
    const y = cursor.getUTCFullYear();
    const m = cursor.getUTCMonth() + 1;
    const d = cursor.getUTCDate();
    const dayOfWeek = cursor.getUTCDay(); // 0=Sun..6=Sat, matches window.day

    const key = `${y}-${m}-${d}`;
    const dayWindows: PlainWindow[] = exceptionByDate.has(key)
      ? exceptionByDate.get(key)!
      : windows
          .filter((w) => w.day === dayOfWeek)
          .map((w) => ({ startMinutes: w.startMinutes, endMinutes: w.endMinutes }));

    for (const w of dayWindows) {
      for (
        let startMin = w.startMinutes;
        startMin + slotMinutes <= w.endMinutes;
        startMin += slotMinutes
      ) {
        const start = zonedWallClockToUtc(
          y,
          m,
          d,
          Math.floor(startMin / 60),
          startMin % 60,
          timezone,
        );
        // Guard against the cursor's local date drifting from the slot's local
        // date across the extra days we scan.
        if (!sameLocalDate({ year: y, month: m, day: d }, getLocalParts(start, timezone)))
          continue;
        if (start < from || start >= to) continue;
        const end = new Date(start.getTime() + slotMinutes * 60 * 1000);
        slots.push({ start, end });
      }
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  slots.sort((a, b) => a.start.getTime() - b.start.getTime());
  return slots;
}

/**
 * Inverse of expandAvailabilityToSlots: collapse concrete dated slots back into
 * weekly AvailabilityWindows (in `timezone`), merging overlapping/adjacent
 * intervals per weekday. Used when a creator opts to save the times they
 * offered for a walk back to their user-level availability.
 */
export function weeklyWindowsFromSlots(
  slots: { start: Date; end: Date }[],
  timezone: string,
): AvailabilityWindow[] {
  const byDay = new Map<number, [number, number][]>();

  for (const slot of slots) {
    const sp = getLocalParts(slot.start, timezone);
    const day = new Date(Date.UTC(sp.year, sp.month - 1, sp.day)).getUTCDay();
    const startMin = sp.hour * 60 + sp.minute;

    const ep = getLocalParts(slot.end, timezone);
    const endDay = new Date(Date.UTC(ep.year, ep.month - 1, ep.day)).getUTCDay();
    let endMin = ep.hour * 60 + ep.minute;
    // If the slot ends on a later local day (crosses midnight) or at exactly
    // midnight, clamp to end-of-day so it stays a valid same-day window.
    if (endDay !== day || endMin <= startMin) endMin = 1440;

    const intervals = byDay.get(day) ?? [];
    intervals.push([startMin, endMin]);
    byDay.set(day, intervals);
  }

  const windows: AvailabilityWindow[] = [];
  for (const [day, intervals] of byDay) {
    intervals.sort((a, b) => a[0] - b[0]);
    let [curStart, curEnd] = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
      const [s, e] = intervals[i];
      if (s <= curEnd) {
        curEnd = Math.max(curEnd, e);
      } else {
        windows.push({ day, startMinutes: curStart, endMinutes: curEnd });
        [curStart, curEnd] = [s, e];
      }
    }
    windows.push({ day, startMinutes: curStart, endMinutes: curEnd });
  }
  return windows;
}
