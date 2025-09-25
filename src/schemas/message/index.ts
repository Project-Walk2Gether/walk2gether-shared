import * as yup from "yup";
import { attachmentSchema } from "../attachment";
import { timestampSchema } from "../utils/timestamp";
import { toolCallSchema } from "./toolCall";

// Base message schema with common fields
const baseMessageSchema = yup.object({
  id: yup.string(),
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
});

// User message schema
export const userMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"user">().oneOf(["user"]).required(),
  message: yup.string().required(),
  attachments: yup.array().of(attachmentSchema.required()).optional(),
  walkId: yup.string().optional(),
  senderId: yup.string().required(),
  senderName: yup.string().required(),
  senderAvatarUrl: yup.string().url().optional(),
});

// Assistant message schema
export const assistantMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"assistant">().oneOf(["assistant"]).required(),
  message: yup.string().required(),
  toolCall: toolCallSchema.optional(),
  auditId: yup.string().optional(),
});

// Tool message schema
export const toolMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"tool">().oneOf(["tool"]).required(),
  message: yup.string().required(),
  toolCall: toolCallSchema.required(),
});

export const systemMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"system">().oneOf(["system"]).required(),
  message: yup.string().required(),
});

// Union schema for all message roles
export const messageSchema = yup.lazy((value) => {
  switch (value?.type) {
    case "user":
      return userMessageSchema;
    case "assistant":
      return assistantMessageSchema;
    case "tool":
      return toolMessageSchema;
    case "system":
      return systemMessageSchema;
    default:
      return userMessageSchema; // Default fallback
  }
});

// Type definitions
export type UserMessage = yup.InferType<typeof userMessageSchema>;
export type AssistantMessage = yup.InferType<typeof assistantMessageSchema>;
export type ToolMessage = yup.InferType<typeof toolMessageSchema>;
export type SystemMessage = yup.InferType<typeof systemMessageSchema>;

// Union type for all messages
export type Message =
  | UserMessage
  | AssistantMessage
  | ToolMessage
  | SystemMessage;

export type ToolCall = yup.InferType<typeof toolCallSchema>;

// Type guards for message discrimination
export const isUserMessage = (message: Message): message is UserMessage =>
  message.role === "user";
export const isAssistantMessage = (
  message: Message
): message is AssistantMessage => message.role === "assistant";
export const isToolMessage = (message: Message): message is ToolMessage =>
  message.role === "tool";
export const isSystemMessage = (message: Message): message is SystemMessage =>
  message.role === "system";
