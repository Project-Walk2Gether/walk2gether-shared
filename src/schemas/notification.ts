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
 * Canonical list of all notification types in the system
 * (Reusing notification preferences from userData.ts)
 */
export const NOTIFICATION_TYPES = NOTIFICATION_PREFERENCES;

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
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Notification = yup.InferType<typeof notificationSchema>;
