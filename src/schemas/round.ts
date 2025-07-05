import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const pairSchema = yup.object({
  userUids: yup.array().of(yup.string().required()).required(),
  color: yup.string().required(),
  emoji: yup.string().required(),
  isTriple: yup.boolean().optional(),
});

export const roundSchema = yup.object({
  walkId: yup.string().required(),
  roundNumber: yup.number().required().integer().min(1),
  startTime: timestampSchema,
  endTime: timestampSchema.optional(),
  questionPrompt: yup.string().optional(),
  pairs: yup.array().of(pairSchema.required()).required(),
});

export type Pair = yup.InferType<typeof pairSchema>;
export type Round = yup.InferType<typeof roundSchema>;
