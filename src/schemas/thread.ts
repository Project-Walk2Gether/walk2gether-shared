import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";
import { documentReferenceSchema, DocumentReferenceLike } from "../firestore/documentReference";

export const threadStatusValues = ["open", "archived"] as const;
export type ThreadStatus = (typeof threadStatusValues)[number];

export const threadTypeValues = [
  "onboarding",
  "planning",
  "support",
  "general",
] as const;
export type ThreadType = (typeof threadTypeValues)[number];

// Optional contextual link for a thread (e.g., to a specific plan or walk)
export const threadContextSchema = yup
  .object({
    type: yup.mixed<"plan" | "walk" | "friendship" | "onboarding">().oneOf([
      "plan",
      "walk",
      "friendship",
      "onboarding",
    ] as const),
    ref: documentReferenceSchema as yup.MixedSchema<DocumentReferenceLike<unknown>>, // e.g., plans/{id}
  })
  .noUnknown()
  .optional();

export const threadSchema = yup
  .object({
    id: yup.string().optional(),
    type: yup.mixed<ThreadType>().oneOf(threadTypeValues as any).required(),
    status: yup.mixed<ThreadStatus>().oneOf(threadStatusValues as any).required(),
    title: yup.string().optional(),
    lastMessageAt: timestampSchema.optional(),
    lastMessageSnippet: yup.string().optional(),
    unreadCount: yup.number().min(0).default(0),
    // Optional contextual link
    context: threadContextSchema,
    // Audit fields
    createdAt: timestampSchema,
    updatedAt: timestampSchema,
    archivedAt: timestampSchema.optional(),
  })
  .noUnknown();

export type Thread = yup.InferType<typeof threadSchema>;
