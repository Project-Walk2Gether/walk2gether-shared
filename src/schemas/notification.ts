import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export enum NotificationType {
  NEW_WALK = "NEW_WALK",
  WALK_INVITE = "WALK_INVITE",
  WALK_REMINDER = "WALK_REMINDER",
  WALK_CANCELLED = "WALK_CANCELLED",
  WALK_UPDATED = "WALK_UPDATED",
  NEW_MESSAGE = "NEW_MESSAGE",
}

export const notificationSchema = yup.object({
  id: yup.string(),
  userId: yup.string().required(),
  type: yup.string().oneOf(Object.values(NotificationType)).required(),
  title: yup.string().required(),
  body: yup.string().required(),
  data: yup.object().required(),
  read: yup.boolean().default(false),
  sent: yup.boolean().default(false),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Notification = yup.InferType<typeof notificationSchema>;
