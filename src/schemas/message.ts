import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const messageSchema = yup.object({
  id: yup.string(),
  senderId: yup.string().required(),
  recipientId: yup.string().required(),
  message: yup.string().required(),
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
});
