import * as yup from "yup";
import { locationSchema } from "../location";
import { timestampSchema } from "../utils/timestamp";

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
  pairs: yup.array().of(pairSchema.required()).required(),
});

export const walkBaseSchema = yup.object({
  id: yup.string(),
  date: timestampSchema.required(),
  active: yup.boolean().required(),
  rsvpdUserIds: yup.array().of(yup.string().required()),
  invitedUserIds: yup.array().of(yup.string().required()),
  location: locationSchema.required(),
  durationMinutes: yup.number().required().positive().integer(),
  organizerName: yup.string().required(),
  createdByUid: yup.string().required(),
  invitationCode: yup.string().required(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Pair = yup.InferType<typeof pairSchema>;
export type Round = yup.InferType<typeof roundSchema>;
