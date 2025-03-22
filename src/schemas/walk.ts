import * as yup from "yup";
import { locationSchema } from "./location";
import { timestampSchema } from "./utils/timestamp";

export const pairSchema = yup.object({
  id: yup.string().required(),
  users: yup.array().of(yup.string().required()).required(),
  color: yup.string().required(),
  number: yup.number().required().positive().integer(),
  isTriple: yup.boolean().optional(),
});

export const roundSchema = yup.object({
  id: yup.string().required(),
  walkId: yup.string().required(),
  roundNumber: yup.number().required().integer().min(1),
  startTime: timestampSchema,
  endTime: timestampSchema.optional(),
  pairs: yup.array().of(pairSchema.required()).required(),
});

export const walkSchema = yup.object({
  id: yup.string().required(),
  date: timestampSchema.required(),
  active: yup.boolean().required(),
  rsvpUsers: yup.array().of(yup.string().required()),
  checkedInUsers: yup.array().of(yup.string().required()),
  theme: yup.string().optional(),
  location: locationSchema.optional(),
  durationMinutes: yup.number().required().positive().integer(),
  numberOfRotations: yup.number().required().integer().min(0),
  rounds: yup.array().of(roundSchema.required()).required(),
  organizer: yup.string().optional(),
  createdByUid: yup.string().required(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Pair = yup.InferType<typeof pairSchema>;
export type Round = yup.InferType<typeof roundSchema>;
export type Walk = yup.InferType<typeof walkSchema>;
