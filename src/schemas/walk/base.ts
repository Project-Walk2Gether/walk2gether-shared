import * as yup from "yup";
import { locationSchema } from "../location";
import { userDataSchema } from "../userData";
import { timestampSchema } from "../utils/timestamp";

export const pairSchema = yup.object({
  id: yup.string().required(),
  users: yup.array().of(yup.string().required()).required(),
  color: yup.string().required(),
  emoji: yup.string().required(),
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

export const walkBaseSchema = yup.object({
  id: yup.string().required(),
  date: timestampSchema.required(),
  active: yup.boolean().required(),
  rsvpUsers: yup.array().of(yup.string().required()),
  checkedInUsers: yup.array().of(yup.string().required()),
  invitedUserIds: yup.array().of(yup.string().required()),
  location: locationSchema.required(),
  durationMinutes: yup.number().required().positive().integer(),
  organizer: yup
    .object({
      uid: yup.string().required(),
      userData: userDataSchema,
    })
    .required(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Pair = yup.InferType<typeof pairSchema>;
export type Round = yup.InferType<typeof roundSchema>;
