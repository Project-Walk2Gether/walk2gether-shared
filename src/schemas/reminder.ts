import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const reminderSchema = yup.object({
  id: yup.string().required(),
  userId: yup.string().required(),
  walkId: yup.string().required(),
  type: yup.string().oneOf(["day_before", "hour_before"]).required(),
  scheduledFor: timestampSchema,
  sent: yup.boolean().required(),
});

export type Reminder = yup.InferType<typeof reminderSchema>;
