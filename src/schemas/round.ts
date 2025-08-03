import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const pairSchema = yup.object({
  userUids: yup.array().of(yup.string().required()).required(),
  emoji: yup.string().required(),
  color: yup.string().required(),
  isTriple: yup.boolean().optional(),
});

export const roundSchema = yup.object({
  id: yup.string(),
  walkId: yup.string().required(),
  roundNumber: yup.number().required().integer().min(1),
  startTime: timestampSchema,
  endTime: timestampSchema.optional(),
  questionPrompt: yup.string().optional().nullable(),
  pairs: yup.array().of(pairSchema.required()).required(),
  createdAt: timestampSchema.optional(),
});

export type Pair = yup.InferType<typeof pairSchema>;
export type Round = yup.InferType<typeof roundSchema>;
