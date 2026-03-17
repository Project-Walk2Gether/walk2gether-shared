import * as yup from "yup";
import { timestampSchema } from "../utils/timestamp";

export const walkRecentMessageSchema = yup.object({
  senderId: yup.string().required(),
  senderName: yup.string().required(),
  message: yup.string().required(),
  createdAt: timestampSchema.required(),
});

export type WalkRecentMessage = yup.InferType<typeof walkRecentMessageSchema>;
