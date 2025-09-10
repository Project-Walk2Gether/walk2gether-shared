import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";
import { roleSchema } from "./message/role";

/**
 * Schema for AI agent audit log entries tracking AI calls and responses
 */
export const aiAuditSchema = yup.object({
  // Metadata
  id: yup.string().optional(),
  userId: yup.string().required(), // User who triggered the AI call
  timestamp: yup.date().required(),
  
  // Request details
  requestType: yup.string().oneOf([
    "chat", 
    "plan_creation", 
    "plan_response", 
    "walk_suggestion",
    "general_query"
  ]).required(),
  
  // Input data sent to AI
  input: yup.object({
    userMessage: yup.string().required(), // The user's message/query
    context: yup.string().optional(), // Generated context sent to AI
    systemPrompt: yup.string().optional(), // System prompt used
    conversationHistory: yup.array().of(
      yup.object({
        role: roleSchema.required(),
        content: yup.string().required(),
        timestamp: yup.date().required()
      })
    ).optional().default([]),
    metadata: yup.mixed().optional() // Additional metadata like plan IDs, etc.
  }).required(),
  
  // AI Response
  output: yup.object({
    response: yup.string().required(), // AI's response text
    tokensUsed: yup.object({
      input: yup.number().optional(),
      output: yup.number().optional(),
      total: yup.number().optional()
    }).optional(),
    model: yup.string().optional(), // AI model used (e.g., "gpt-4", "claude-3")
    responseTime: yup.number().optional(), // Response time in milliseconds
    success: yup.boolean().required(),
    errorMessage: yup.string().optional()
  }).required(),
  
  // Performance metrics
  metrics: yup.object({
    contextGenerationTime: yup.number().optional(), // Time to generate context
    totalProcessingTime: yup.number().optional(), // End-to-end processing time
    contextLength: yup.number().optional(), // Length of context sent
    responseLength: yup.number().optional() // Length of AI response
  }).optional(),
  
  // Audit fields
  createdAt: timestampSchema,
  updatedAt: timestampSchema
}).required();

export type AiAudit = yup.InferType<typeof aiAuditSchema>;
