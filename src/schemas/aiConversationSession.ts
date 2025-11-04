import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const aiConversationSession = yup.object({
  id: yup.string(),
  userId: yup.string().required(),
  summary: yup.string().required().nullable(),
  taskId: yup.string().required(),
  expiresAt: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type AIConversationSession = yup.InferType<typeof aiConversationSession>;
