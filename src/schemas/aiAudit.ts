import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";
import { roleSchema } from "./message/role";

/**
 * Minimal AI audit log schema that mirrors OpenAI Chat Completions request/response shapes.
 * It captures: what data went in (request) and what came out (response).
 */
export const aiAuditSchema = yup
  .object({
    // Metadata
    id: yup.string().optional(),
    userId: yup.string().required(),
    sessionId: yup.string().required(),
    
    // Task context
    task: yup
      .object({
        id: yup.string().required(),
        name: yup.string().required(),
        description: yup.string().optional(),
      })
      .optional(),

    // What we sent to OpenAI
    request: yup
      .object({
        model: yup.string().optional(),
        messages: yup
          .array()
          .of(
            yup.object({
              role: roleSchema.required(),
              // OpenAI supports string or array of content parts; accept any JSON here
              content: yup.mixed().required(),
            })
          )
          .required(),
        tools: yup.mixed().optional(),
        tool_choice: yup.mixed().optional(),
        temperature: yup.number().optional(),
      })
      .required(),

    // What we received from OpenAI
    response: yup
      .object({
        // The assistant message returned (single turn)
        message: yup
          .object({
            role: roleSchema.required(),
            content: yup.mixed().nullable(),
            tool_calls: yup.mixed().optional(),
          })
          .required(),
        model: yup.string().optional(),
        usage: yup
          .object({
            prompt_tokens: yup.number().optional(),
            completion_tokens: yup.number().optional(),
            total_tokens: yup.number().optional(),
          })
          .optional(),
        id: yup.string().optional(),
        created: yup.number().optional(),
        success: yup.boolean().required(),
        errorMessage: yup.string().optional(),
      })
      .required(),

    // Audit timestamps
    createdAt: timestampSchema,
    updatedAt: timestampSchema,
  })
  .required();

export type AiAudit = yup.InferType<typeof aiAuditSchema>;
