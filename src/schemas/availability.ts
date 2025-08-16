import * as yup from "yup";
import { locationSchema } from "./location";
import { timestampSchema } from "./utils/timestamp";

/**
 * Minutes since start of day helper type (0..1440)
 */
export type Minutes = number;

/**
 * A weekly recurring availability window.
 * day: 0 = Sunday ... 6 = Saturday (matches JS Date.getDay())
 * startMinutes/endMinutes: minutes since 12:00 AM local time
 */
export const availabilityWindowSchema = yup.object({
  day: yup.number().min(0).max(6).required(),
  startMinutes: yup.number().min(0).max(1440).required(),
  endMinutes: yup
    .number()
    .min(0)
    .max(1440)
    .moreThan(yup.ref("startMinutes"))
    .required(),
  note: yup.string().optional(),
  // Optional preferred meetup location tied to this window
  location: locationSchema.optional(),
});
export type AvailabilityWindow = yup.InferType<typeof availabilityWindowSchema>;

/**
 * A one-off override for a specific date (e.g., vacation day or special case).
 * If present, these take precedence over weekly windows.
 */
export const specificDateAvailabilitySchema = yup.object({
  date: timestampSchema.required(),
  // If windows array empty, treat as "not available on this date"
  windows: yup.array().of(
    yup.object({
      startMinutes: yup.number().min(0).max(1440).required(),
      endMinutes: yup
        .number()
        .min(0)
        .max(1440)
        .moreThan(yup.ref("startMinutes"))
        .required(),
      note: yup.string().optional(),
      location: locationSchema.optional(),
    })
  ).default([]),
});
export type SpecificDateAvailability = yup.InferType<
  typeof specificDateAvailabilitySchema
>;

/**
 * User Availability root schema
 */
export const availabilitySchema = yup.object({
  timezone: yup.string().optional(),
  windows: yup.array().of(availabilityWindowSchema).default([]),
  exceptions: yup
    .array()
    .of(specificDateAvailabilitySchema)
    .default([]),
  // Auditing fields can be appended by backend
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});
export type Availability = yup.InferType<typeof availabilitySchema>;
