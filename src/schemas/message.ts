import * as yup from "yup";
import { documentReferenceSchema } from "../firestore/documentReference";
import { attachmentSchema } from "./attachment";
import { timestampSchema } from "./utils/timestamp";

// Base message types
export const baseMessageTypeSchema = yup
  .mixed<"human" | "ai" | "tool">()
  .oneOf(["human", "ai", "tool"]) as yup.Schema<"human" | "ai" | "tool">;

// System message types for events
export const systemMessageTypeSchema = yup
  .mixed<"plan_started" | "plan_updated" | "plan_cancelled">()
  .oneOf(["plan_started", "plan_updated", "plan_cancelled"]) as yup.Schema<"plan_started" | "plan_updated" | "plan_cancelled">;

// Union of all message types
export const messageTypeSchema = yup
  .mixed<"human" | "ai" | "tool" | "plan_started" | "plan_updated" | "plan_cancelled">()
  .oneOf(["human", "ai", "tool", "plan_started", "plan_updated", "plan_cancelled"]) as yup.Schema<"human" | "ai" | "tool" | "plan_started" | "plan_updated" | "plan_cancelled">;

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

// Base message schema with common fields
const baseMessageSchema = yup.object({
  id: yup.string(),
  walkId: yup.string().optional(),
  senderId: yup.string().required(),
  senderName: yup.string().required(),
  senderAvatarUrl: yup.string().url().optional(),
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
  read: yup.boolean().default(false),
  roundId: yup.string().optional(),
});

// User message schema
export const userMessageSchema = baseMessageSchema.shape({
  type: yup.mixed<"human">().oneOf(["human"]).required(),
  message: yup.string().required(),
  attachments: yup.array().of(attachmentSchema.required()).optional(),
});

// Assistant message schema
export const assistantMessageSchema = baseMessageSchema.shape({
  type: yup.mixed<"ai">().oneOf(["ai"]).required(),
  message: yup.string().required(),
  toolCall: toolCallSchema.optional(),
});

// Tool message schema
export const toolMessageSchema = baseMessageSchema.shape({
  type: yup.mixed<"tool">().oneOf(["tool"]).required(),
  message: yup.string().required(),
  toolCall: toolCallSchema.required(),
});

// Plan started system message schema
export const planStartedMessageSchema = baseMessageSchema.shape({
  type: yup.mixed<"plan_started">().oneOf(["plan_started"]).required(),
  planDoc: documentReferenceSchema.required(),
  planId: yup.string().required(),
  planTitle: yup.string().required(),
  invitedFriendName: yup.string().required(),
});

// Plan updated system message schema
export const planUpdatedMessageSchema = baseMessageSchema.shape({
  type: yup.mixed<"plan_updated">().oneOf(["plan_updated"]).required(),
  planDoc: documentReferenceSchema.required(),
  planId: yup.string().required(),
  planTitle: yup.string().required(),
  updateType: yup.mixed<"time_chosen" | "location_chosen" | "status_changed">().oneOf(["time_chosen", "location_chosen", "status_changed"]).required(),
});

// Plan cancelled system message schema
export const planCancelledMessageSchema = baseMessageSchema.shape({
  type: yup.mixed<"plan_cancelled">().oneOf(["plan_cancelled"]).required(),
  planDoc: documentReferenceSchema.required(),
  planId: yup.string().required(),
  planTitle: yup.string().required(),
  reason: yup.string().optional(),
});

// Union schema for all message types
export const messageSchema = yup.lazy((value) => {
  switch (value?.type) {
    case "human":
      return userMessageSchema;
    case "ai":
      return assistantMessageSchema;
    case "tool":
      return toolMessageSchema;
    case "plan_started":
      return planStartedMessageSchema;
    case "plan_updated":
      return planUpdatedMessageSchema;
    case "plan_cancelled":
      return planCancelledMessageSchema;
    default:
      return userMessageSchema; // Default fallback
  }
});

// Type definitions
export type UserMessage = yup.InferType<typeof userMessageSchema>;
export type AssistantMessage = yup.InferType<typeof assistantMessageSchema>;
export type ToolMessage = yup.InferType<typeof toolMessageSchema>;
export type PlanStartedMessage = yup.InferType<typeof planStartedMessageSchema>;
export type PlanUpdatedMessage = yup.InferType<typeof planUpdatedMessageSchema>;
export type PlanCancelledMessage = yup.InferType<typeof planCancelledMessageSchema>;

// Union type for all messages
export type Message = UserMessage | AssistantMessage | ToolMessage | PlanStartedMessage | PlanUpdatedMessage | PlanCancelledMessage;

export type ToolCall = yup.InferType<typeof toolCallSchema>;

// Type guards for message discrimination
export const isUserMessage = (message: Message): message is UserMessage => message.type === "human";
export const isAssistantMessage = (message: Message): message is AssistantMessage => message.type === "ai";
export const isToolMessage = (message: Message): message is ToolMessage => message.type === "tool";
export const isPlanStartedMessage = (message: Message): message is PlanStartedMessage => message.type === "plan_started";
export const isPlanUpdatedMessage = (message: Message): message is PlanUpdatedMessage => message.type === "plan_updated";
export const isPlanCancelledMessage = (message: Message): message is PlanCancelledMessage => message.type === "plan_cancelled";
