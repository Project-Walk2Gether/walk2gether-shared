/**
 * Timezone primitives for converting between wall-clock times in an IANA
 * timezone and absolute UTC instants.
 *
 * Use these instead of the "toLocaleString offset trick" (formatting a Date to
 * a string in two timezones and diffing the re-parsed strings). That trick
 * silently assumes the server runs in UTC and mishandles DST — it produces a
 * wrong instant whenever neither of those holds.
 */

export interface LocalParts {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number; // 0-23
  minute: number;
}

/**
 * Returns the wall-clock components of `date` as seen in the given IANA timezone.
 */
export function getLocalParts(date: Date, timeZone: string): LocalParts {
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
export function getOffsetMs(date: Date, timeZone: string): number {
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
export function zonedWallClockToUtc(
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
