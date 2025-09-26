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
  type: yup.mixed<"user">().oneOf(["user"]).required(),
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
  type: yup.mixed<"assistant">().oneOf(["assistant"]).required(),
  message: yup.string().required(),
  toolCall: toolCallSchema.optional(),
  auditId: yup.string().optional(),
});

// Tool message schema
export const toolMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"tool">().oneOf(["tool"]).required(),
  type: yup.mixed<"tool">().oneOf(["tool"]).required(),
  message: yup.string().required(),
  toolCall: toolCallSchema.required(),
});

export const systemMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"system">().oneOf(["system"]).required(),
  type: yup.mixed<"system">().oneOf(["system"]).required(),
  message: yup.string().required(),
});

// Template message schema for WhatsApp templates
export const templateMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"assistant">().oneOf(["assistant"]).required(),
  type: yup.mixed<"template">().oneOf(["template"]).required(),
  message: yup.string().required(), // Fallback text if template fails
  templateSid: yup.string().required(),
  templateVariables: yup.array().of(yup.string().required()).required(),
});

// Location suggestions message schema for sending location options with images
export const locationSuggestionsMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"assistant">().oneOf(["assistant"]).required(),
  type: yup.mixed<"location_suggestions">().oneOf(["location_suggestions"]).required(),
  message: yup.string().required(), // Text description of the locations
  planId: yup.string().required(), // The plan these locations are for
  locations: yup.array().of(
    yup.object({
      id: yup.string().required(),
      name: yup.string().required(),
      latitude: yup.number().required(),
      longitude: yup.number().required(),
      address: yup.string().optional(),
      description: yup.string().optional(),
      imageUrl: yup.string().url().optional(),
      rating: yup.number().optional(),
    })
  ).required(),
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
    case "template":
      return templateMessageSchema;
    case "location_suggestions":
      return locationSuggestionsMessageSchema;
    default:
      return userMessageSchema; // Default fallback
  }
});

// Type definitions
export type UserMessage = yup.InferType<typeof userMessageSchema>;
export type AssistantMessage = yup.InferType<typeof assistantMessageSchema>;
export type ToolMessage = yup.InferType<typeof toolMessageSchema>;
export type SystemMessage = yup.InferType<typeof systemMessageSchema>;
export type TemplateMessage = yup.InferType<typeof templateMessageSchema>;
export type LocationSuggestionsMessage = yup.InferType<typeof locationSuggestionsMessageSchema>;

// Union type for all messages
export type Message =
  | UserMessage
  | AssistantMessage
  | ToolMessage
  | SystemMessage
  | TemplateMessage
  | LocationSuggestionsMessage;

export type ToolCall = yup.InferType<typeof toolCallSchema>;

// Type guards for message discrimination
export const isUserMessage = (message: Message): message is UserMessage =>
  message.type === "user";
export const isAssistantMessage = (
  message: Message
): message is AssistantMessage => message.type === "assistant";
export const isToolMessage = (message: Message): message is ToolMessage =>
  message.type === "tool";
export const isSystemMessage = (message: Message): message is SystemMessage =>
  message.type === "system";
export const isTemplateMessage = (
  message: Message
): message is TemplateMessage => message.type === "template";
export const isLocationSuggestionsMessage = (
  message: Message
): message is LocationSuggestionsMessage => message.type === "location_suggestions";
