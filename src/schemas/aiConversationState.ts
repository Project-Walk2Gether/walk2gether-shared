import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

/**
 * Schema for storing conversation state (summary) for a user.
 * This is a single document per user at: users/{userId}/aiConversationState/state
 *
 * This replaces the session-based summary storage with a single, continuously
 * updated summary that provides context for the AI agent.
 */
export const aiConversationStateSchema = yup.object({
  summaryText: yup.string().required().nullable(),
  summaryUpdatedAt: timestampSchema.nullable(),
  messageCountSinceLastSummary: yup.number().default(0),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type AIConversationState = yup.InferType<
  typeof aiConversationStateSchema
>;
