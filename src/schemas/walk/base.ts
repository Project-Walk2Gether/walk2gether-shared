import * as yup from "yup";
import { locationSchema } from "../location";
import { routeSchema } from "../participant";
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
  invitedUserIds: yup.array().of(yup.string().required()),
  withinRadiusUserIds: yup.array().of(yup.string().required()),
  currentLocation: locationSchema,
  startLocation: locationSchema,
  durationMinutes: yup.number().required().positive().integer(),
  organizerName: yup.string().required(),
  createdByUid: yup.string().required(),
  // Sharing determins who sees this on the stories screen
  isSharedWithPublic: yup.boolean(),
  sharedWithUserUids: yup.array().of(yup.string().required()),
  route: routeSchema,
  totalDistanceMiles: yup.number(),
  startedAt: timestampSchema,
  endedAt: timestampSchema,
  estimatedEndTime: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Pair = yup.InferType<typeof pairSchema>;
export type Round = yup.InferType<typeof roundSchema>;
