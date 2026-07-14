import { getLocalParts } from "./timezone";

/**
 * Week keys for the weekly availability-confirmation cadence.
 *
 * A "week" is Monday–Sunday, keyed by the ISO date ("YYYY-MM-DD") of its Monday.
 * Keys are computed in the user's own timezone so the week boundary matches
 * their local calendar. The Sunday-evening prompt targets the UPCOMING week
 * (nextWeekMondayKey), and the Mon–Fri matching runs use the CURRENT week
 * (currentWeekMondayKey) — on any given Monday these two coincide, so a Sunday
 * prompt and the following week's matching reference the same key.
 */

function isoDate(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/** Monday of the ISO week containing `date`, as "YYYY-MM-DD" in `timeZone`. */
export function currentWeekMondayKey(date: Date, timeZone: string): string {
  const { year, month, day } = getLocalParts(date, timeZone);
  // Day-of-week of the local calendar date (0=Sun..6=Sat).
  const dow = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const daysSinceMonday = (dow + 6) % 7; // Mon=0, Sun=6
  const monday = new Date(Date.UTC(year, month - 1, day - daysSinceMonday));
  return isoDate(
    monday.getUTCFullYear(),
    monday.getUTCMonth() + 1,
    monday.getUTCDate(),
  );
}

/** Monday of the NEXT week (7 days after the current week's Monday). */
export function nextWeekMondayKey(date: Date, timeZone: string): string {
  const current = currentWeekMondayKey(date, timeZone);
  const [y, m, d] = current.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + 7));
  return isoDate(
    next.getUTCFullYear(),
    next.getUTCMonth() + 1,
    next.getUTCDate(),
  );
}
