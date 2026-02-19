import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

/**
 * Room schema for the new rooms system that replaces rounds.
 * Rooms can be either:
 * - "friends": a room between two people that know each other
 * - "group": a room between two or more people that likely don't know each other
 */
export const roomSchema = yup.object({
  id: yup.string(),
  walkId: yup.string().required(),
  type: yup.mixed<"friends" | "group">().oneOf(["friends", "group"]).required(),
  memberUids: yup.array().of(yup.string().required()).required(),

  conversationStarterPrompt: yup.string().optional(),
  isActive: yup.boolean().required(),
  isFirstRoomForWalk: yup.boolean(),
  createdAt: timestampSchema.required(),
  startedAt: timestampSchema.nullable(),
  shouldEndAt: timestampSchema.nullable().required(),
  endedAt: timestampSchema.nullable(),
  durationMinutes: yup.number().required(),
  livekitRoomName: yup.string().nullable(),
  introductionText: yup.string().required(),
  memberDistanceAtStartMeters: yup
    .mixed<Record<string, number>>()
    .nullable()
    .default(null),
  memberDistanceAtEndMeters: yup
    .mixed<Record<string, number>>()
    .nullable()
    .default(null),
  distanceWalkedMeters: yup.number().nullable().default(null),
});

export type Room = yup.InferType<typeof roomSchema>;
