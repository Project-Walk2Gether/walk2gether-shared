import * as yup from "yup";
import { attachmentSchema } from "../attachment";
import { timestampSchema } from "../utils/timestamp";
import { toolCallSchema } from "./toolCall";

// Base message schema with common fields
const baseMessageSchema = yup.object({
  id: yup.string(),
  createdAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
  attachments: yup.array().of(attachmentSchema.required()).optional(),
});

// User message schema
export const userMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"user">().oneOf(["user"]).required(),
  type: yup.mixed<"user">().oneOf(["user"]).required(),
  message: yup.string().required(),
  walkId: yup.string().optional(),
  senderId: yup.string().required(),
  senderName: yup.string().required(),
  senderAvatarUrl: yup.string().url().optional(),
  // When true, the server skips push notifications and recent-message preview for this message
  suppressNotification: yup.boolean().optional(),
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

// First walk prompt message schema for introduced friendships
export const firstWalkPromptMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"system">().oneOf(["system"]).required(),
  type: yup
    .mixed<"first_walk_prompt">()
    .oneOf(["first_walk_prompt"])
    .required(),
  message: yup.string().required(),
  introducerName: yup.string().required(),
  introReason: yup.string().optional(),
});

// Availability update message — posted when a user sets their availability
export const availabilityUpdateMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"system">().oneOf(["system"]).required(),
  type: yup
    .mixed<"availability_update">()
    .oneOf(["availability_update"])
    .required(),
  message: yup.string().required(),
  senderName: yup.string().required(),
  windows: yup
    .array()
    .of(
      yup.object({
        day: yup.number().min(0).max(6).required(),
        startMinutes: yup.number().min(0).max(1440).required(),
        endMinutes: yup.number().min(0).max(1440).required(),
      }),
    )
    .required(),
});

// Walk time confirmed message — posted when a user picks a specific slot from friend's availability
export const walkTimeConfirmedMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"system">().oneOf(["system"]).required(),
  type: yup
    .mixed<"walk_time_confirmed">()
    .oneOf(["walk_time_confirmed"])
    .required(),
  message: yup.string().required(),
  senderName: yup.string().required(),
  confirmedDay: yup.number().min(0).max(6).required(),
  confirmedStartMinutes: yup.number().min(0).max(1440).required(),
  confirmedEndMinutes: yup.number().min(0).max(1440).required(),
});

// Location suggestions message schema for sending location options with images
export const locationSuggestionsMessageSchema = baseMessageSchema.shape({
  role: yup.mixed<"assistant">().oneOf(["assistant"]).required(),
  type: yup
    .mixed<"location_suggestions">()
    .oneOf(["location_suggestions"])
    .required(),
  message: yup.string().required(), // Text description of the locations
  planId: yup.string().required(), // The plan these locations are for
  locations: yup
    .array()
    .of(
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
    )
    .required(),
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
    case "first_walk_prompt":
      return firstWalkPromptMessageSchema;
    case "availability_update":
      return availabilityUpdateMessageSchema;
    case "walk_time_confirmed":
      return walkTimeConfirmedMessageSchema;
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
export type LocationSuggestionsMessage = yup.InferType<
  typeof locationSuggestionsMessageSchema
>;
export type FirstWalkPromptMessage = yup.InferType<
  typeof firstWalkPromptMessageSchema
>;
export type AvailabilityUpdateMessage = yup.InferType<
  typeof availabilityUpdateMessageSchema
>;
export type WalkTimeConfirmedMessage = yup.InferType<
  typeof walkTimeConfirmedMessageSchema
>;

// Union type for all messages
export type Message =
  | UserMessage
  | AssistantMessage
  | ToolMessage
  | SystemMessage
  | TemplateMessage
  | LocationSuggestionsMessage
  | FirstWalkPromptMessage
  | AvailabilityUpdateMessage
  | WalkTimeConfirmedMessage;

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
): message is LocationSuggestionsMessage =>
  message.type === "location_suggestions";
export const isFirstWalkPromptMessage = (
  message: Message
): message is FirstWalkPromptMessage =>
  message.type === "first_walk_prompt";
export const isAvailabilityUpdateMessage = (
  message: Message
): message is AvailabilityUpdateMessage =>
  message.type === "availability_update";
export const isWalkTimeConfirmedMessage = (
  message: Message
): message is WalkTimeConfirmedMessage =>
  message.type === "walk_time_confirmed";
