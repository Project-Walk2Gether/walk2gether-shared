import * as yup from "yup";
import { attachmentSchema } from "./attachment";
import { timestampSchema } from "./utils/timestamp";

export const messageSchema = yup.object({
  id: yup.string(),
  walkId: yup.string().required(),
  senderId: yup.string().required(),
  senderName: yup.string().required(),
  message: yup.string().required(),
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
  read: yup.boolean().default(false),
  attachments: yup.array().of(attachmentSchema.required()).optional(),
});

export type Message = yup.InferType<typeof messageSchema>;
