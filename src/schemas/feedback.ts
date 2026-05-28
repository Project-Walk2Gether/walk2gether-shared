import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

/**
 * Default end-of-walk debrief questions, used when neither the walk nor the
 * global config (config/feedback) specifies any.
 */
export const DEFAULT_FEEDBACK_QUESTIONS = [
  "How was your walk?",
  "Any feedback for us?",
];

/**
 * Global feedback configuration document, stored at `config/feedback`.
 */
export const feedbackConfigSchema = yup.object({
  defaultQuestions: yup.array().of(yup.string().required()).required(),
  updatedAt: timestampSchema.optional(),
});

export type FeedbackConfig = yup.InferType<typeof feedbackConfigSchema>;

/**
 * A single recorded answer to a debrief question, stored under an aiFeedback
 * room's `feedbackAnswers` subcollection.
 */
export const feedbackAnswerSchema = yup.object({
  question: yup.string().required(),
  answer: yup.string().required(),
  ts: timestampSchema.required(),
});

export type FeedbackAnswer = yup.InferType<typeof feedbackAnswerSchema>;
