import * as yup from "yup";
import { CALENDAR_PROVIDERS } from "./calendarAccount";
import { timestampSchema } from "./utils/timestamp";

/**
 * A busy event synced from an external calendar, used to block off slots on the
 * availability screen. Stored at users/{uid}/calendarEvents/{eventId}.
 *
 * Only a rolling window (~next 4 weeks) of busy events is kept. Client-readable
 * by the owning user (their own calendar); functions write via the Admin SDK.
 */
export const calendarEventSchema = yup.object({
  id: yup.string(),
  // The calendarAccounts doc this event was synced from.
  accountId: yup.string().required(),
  provider: yup.string().oneOf(CALENDAR_PROVIDERS).required(),
  // Stable id from the provider, used to upsert/dedupe across syncs.
  externalId: yup.string().required(),
  title: yup.string().required(),
  startUtc: timestampSchema.required(),
  endUtc: timestampSchema.required(),
  allDay: yup.boolean().required().default(false),
  // User has chosen to ignore this event so it no longer blocks availability.
  // Written by the client; preserved across syncs (the sync upsert uses merge).
  ignored: yup.boolean().optional(),
  updatedAt: timestampSchema,
});

export type CalendarEvent = yup.InferType<typeof calendarEventSchema>;
