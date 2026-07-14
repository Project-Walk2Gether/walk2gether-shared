import * as yup from "yup";
import { availabilityWindowSchema, Availability } from "./availability";
import { timestampSchema } from "./utils/timestamp";

/**
 * A user's confirmed availability for a single week, stored at
 * `users/{uid}/weeklyAvailability/{weekOf}`. The existence of the doc for a
 * given week IS the confirmation — matching only counts a user for a week if
 * this doc exists. `windows` are the same weekly-recurring shape as the
 * template availability, but scoped to (and confirmed for) this one week.
 *
 * The recurring `users/{uid}.availability` template seeds each week's prompt;
 * Chester writes this per-week doc when the user confirms, and only updates the
 * template too when the user explicitly asks to make it their default.
 */
export const weeklyAvailabilitySchema = yup.object({
  // "YYYY-MM-DD" — the Monday of the week, in the user's timezone (doc id).
  weekOf: yup.string().required(),
  timezone: yup.string().required(),
  windows: yup.array().of(availabilityWindowSchema).default([]),
  confirmedAt: timestampSchema.required(),
});

export type WeeklyAvailability = yup.InferType<typeof weeklyAvailabilitySchema>;

/** Build a template-shaped Availability from a week's confirmed windows. */
export function weeklyAvailabilityToAvailability(
  weekly: Pick<WeeklyAvailability, "timezone" | "windows">,
): Availability {
  return {
    timezone: weekly.timezone,
    windows: weekly.windows ?? [],
    exceptions: [],
  };
}
