import * as yup from "yup";
import { keyBy } from "lodash";
import { timestampSchema } from "./utils/timestamp";

/**
 * Notification type metadata
 */
export interface NotificationTypeInfo {
  key: string;
  label: string;
  description: string;
  icon?: string; // Optional icon reference
}

/**
 * Canonical list of all notification types in the system
 */
export const NOTIFICATION_TYPES: NotificationTypeInfo[] = [
  {
    key: "NEW_WALK",
    label: "New Walk",
    description: "When a new walk is created in your neighborhood"
  },
  {
    key: "WALK_INVITE",
    label: "Walk Invitation",
    description: "When you're invited to join a walk"
  },
  {
    key: "WALK_REMINDER",
    label: "Walk Reminder",
    description: "Reminder about an upcoming walk"
  },
  {
    key: "WALK_CANCELLED",
    label: "Walk Cancelled",
    description: "When a walk you're participating in is cancelled"
  },
  {
    key: "WALK_UPDATED",
    label: "Walk Updated",
    description: "When details of a walk you're participating in are updated"
  },
  {
    key: "NEW_MESSAGE",
    label: "New Message",
    description: "When you receive a new message from a friend"
  },
  {
    key: "NEW_PARTICIPANT_REQUEST",
    label: "Join Request",
    description: "When someone requests to join your walk"
  },
  {
    key: "PARTICIPANT_REQUEST_CANCELLED",
    label: "Request Cancelled",
    description: "When someone cancels their request to join your walk"
  }
];

/**
 * Map of notification type keys for easy access
 */
export const NotificationType = keyBy(NOTIFICATION_TYPES, 'key');

export const notificationSchema = yup.object({
  id: yup.string(),
  userId: yup.string().required(),
  type: yup.string().oneOf(NOTIFICATION_TYPES.map(t => t.key)).required(),
  title: yup.string().required(),
  body: yup.string().required(),
  data: yup.object().required(),
  read: yup.boolean().default(false),
  sent: yup.boolean().default(false),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Notification = yup.InferType<typeof notificationSchema>;
