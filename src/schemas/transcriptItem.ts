import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const transcriptItemSchema = yup.object({
  role: yup.mixed<"user" | "assistant">().oneOf(["user", "assistant"]).required(),
  text: yup.string().required(),
  ts: timestampSchema.required(),
  interrupted: yup.boolean().optional(),
  type: yup.mixed<"final" | "partial">().oneOf(["final", "partial"]).optional(),
});

export type TranscriptItem = yup.InferType<typeof transcriptItemSchema>;
