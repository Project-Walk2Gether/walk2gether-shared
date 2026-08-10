import { keyBy } from "lodash";
import * as yup from "yup";
import {
  NOTIFICATION_PREFERENCES,
  NotificationPreferenceInfo,
} from "./userData";
import { timestampSchema } from "./utils/timestamp";

/**
 * Notification type metadata - reusing the interface from userData.ts
 */
export type NotificationTypeInfo = NotificationPreferenceInfo;

/**
 * Notification types that are NOT user preferences.
 *
 * These go to staff about someone else's activity, so they differ from
 * NOTIFICATION_PREFERENCES in two ways that matter: they must never appear in
 * the notification settings screen (driven by notificationPreferenceLabels,
 * which is keyed off NOTIFICATION_PREFERENCES alone), and they must not be
 * suppressible by an end user's opt-out.
 *
 * crashAlert is listed because scripts/sendTestCrashAlert.ts has been writing
 * it since before this list existed. It only ever worked because a direct
 * collection write skips the yup validation that notificationSchema declares —
 * so the `oneOf` below was quietly untrue. Naming it here makes it true again.
 */
export const INTERNAL_NOTIFICATION_TYPES: NotificationTypeInfo[] = [
  {
    key: "contentReport",
    label: "Content Reports",
    description:
      "Sent to admins when a user reports content or blocks someone, so reports can be actioned within 24 hours",
  },
  {
    key: "crashAlert",
    label: "Crash Alerts",
    description: "Sent to admins when a new Crashlytics issue appears",
  },
];

/**
 * Canonical list of all notification types in the system: the user-facing
 * preferences, plus the internal ones above.
 */
export const NOTIFICATION_TYPES: NotificationTypeInfo[] = [
  ...NOTIFICATION_PREFERENCES,
  ...INTERNAL_NOTIFICATION_TYPES,
];

/**
 * Map of notification type keys for easy access
 */
export const NotificationType = keyBy(NOTIFICATION_TYPES, "key");

export const notificationSchema = yup.object({
  id: yup.string(),
  userId: yup.string().required(),
  type: yup
    .string()
    .oneOf(NOTIFICATION_TYPES.map((t) => t.key))
    .required(),
  title: yup.string().required(),
  body: yup.string().required(),
  data: yup.object().optional(),
  // Expo notification category id, used to attach quick-action buttons
  // (e.g. "Going" / "Can't make it") on the device.
  categoryId: yup.string().optional(),
  expoPushToken: yup.string().required(),
  sentAt: timestampSchema.optional(),
  deliveryResponse: yup
    .array()
    .of(
      yup.object({
        status: yup.string().required(),
        id: yup.string().optional(),
        message: yup.string().optional(),
        details: yup.object().optional(),
      }),
    )
    .optional(),
  expoReceiptIds: yup.array().of(yup.string().required()).optional(),
  receiptStatus: yup.string().oneOf(["pending", "none", "complete"]).optional(),
  pushReceipts: yup.object().optional(),
  pushReceiptFetchError: yup.string().optional(),
  error: yup.string().optional(),
  errorStage: yup.string().optional(),
  retryCount: yup.number().optional(),
  lastRetryAt: timestampSchema.optional(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Notification = yup.InferType<typeof notificationSchema>;
