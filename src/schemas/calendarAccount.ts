import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const CALENDAR_PROVIDERS = ["google", "microsoft"] as const;
export type CalendarProvider = (typeof CALENDAR_PROVIDERS)[number];

export const CALENDAR_PROVIDER_LABELS: Record<CalendarProvider, string> = {
  google: "Google Calendar",
  microsoft: "Outlook",
};

export const CALENDAR_ACCOUNT_STATUS_OPTIONS = [
  "active",
  "reauth_required",
  "revoked",
] as const;
export type CalendarAccountStatus =
  (typeof CALENDAR_ACCOUNT_STATUS_OPTIONS)[number];

/**
 * Public, client-readable metadata for a linked external calendar account.
 * Stored at users/{uid}/calendarAccounts/{accountId}.
 *
 * NOTE: OAuth tokens are NEVER stored here (this collection is readable by the
 * owning client). Tokens live server-side only in the top-level calendarSecrets
 * collection, which is denied to all clients (see firestore.rules).
 */
export const calendarAccountSchema = yup.object({
  id: yup.string(),
  provider: yup.string().oneOf(CALENDAR_PROVIDERS).required(),
  // The external account's email / identifier, shown to the user.
  email: yup.string().required(),
  displayName: yup.string().optional(),
  status: yup
    .string()
    .oneOf(CALENDAR_ACCOUNT_STATUS_OPTIONS)
    .required()
    .default("active"),
  createdAt: timestampSchema,
  lastSyncedAt: timestampSchema.nullable().defined(),
  // True while a sync is in flight (set by syncCalendarAccount, cleared when it
  // finishes). Drives a spinner in the "Calendars" footer.
  syncing: yup.boolean().optional(),
});

export type CalendarAccount = yup.InferType<typeof calendarAccountSchema>;
