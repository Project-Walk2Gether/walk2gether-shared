import * as yup from "yup";
import { attachmentSchema } from "./attachment";
import { timestampSchema } from "./utils/timestamp";

// Differentiated message types for conversations
export const messageTypeSchema = yup
  .mixed<"human" | "ai" | "tool">()
  .oneOf(["human", "ai", "tool"]) as yup.Schema<"human" | "ai" | "tool">;

// Payload for logging tool calls within the conversation stream
export const toolCallSchema = yup.object({
  name: yup.string().required(),
  args: yup.mixed().optional(),
  result: yup.mixed().optional(),
  status: yup
    .mixed<"started" | "success" | "error">()
    .oneOf(["started", "success", "error"])
    .optional(),
  errorMessage: yup.string().optional(),
  startedAt: timestampSchema.optional(),
  completedAt: timestampSchema.optional(),
});

export const messageSchema = yup.object({
  id: yup.string(),
  // Walk messages may include a walkId; AI conversation messages won't
  walkId: yup.string().optional(),
  // Who authored the message ("ai" for system/assistant entries)
  senderId: yup.string().required(),
  senderName: yup.string().required(),
  // Differentiated type: human typed message, ai reply, or tool log entry
  type: messageTypeSchema.optional().default("human"),
  // Text body for human/ai messages. Tool entries may include a summary here.
  message: yup.string().required(),
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
  read: yup.boolean().default(false),
  attachments: yup.array().of(attachmentSchema.required()).optional(),
  // Tool call metadata when type === "tool"
  toolCall: toolCallSchema.optional(),
  // Round-related fields
  roundId: yup.string().optional(),
});

export type Message = yup.InferType<typeof messageSchema>;
export type ToolCall = yup.InferType<typeof toolCallSchema>;
