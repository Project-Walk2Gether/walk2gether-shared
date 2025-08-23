import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

// Minimal schema for AIConversation for now
export const aiConversationSchema = yup.object({
  id: yup.string(),
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
});

export type AIConversation = yup.InferType<typeof aiConversationSchema>;
