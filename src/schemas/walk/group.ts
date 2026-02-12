import * as yup from "yup";
import { walkBaseSchema } from "./base";

export const groupWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"group">().oneOf(["group"]).required(),
  topic: yup.string().required(),
  descriptionMarkdown: yup.string(),
  questionPrompts: yup.array().of(yup.string().required()),
  newMatchesPossibleForUserUids: yup
    .array()
    .of(yup.string().required())
    .optional()
    .default([]),
  roundLengthMinutes: yup.number().required().integer().min(0).default(5),
});

export type GroupWalk = yup.InferType<typeof groupWalkSchema>;
