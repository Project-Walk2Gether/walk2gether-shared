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
  roundNumber: yup.number().required().integer().min(0),
  conversationStarterPrompt: yup.string().optional(),
  isActive: yup.boolean().required(),
  isFirstRoomForWalk: yup.boolean(),
  createdAt: timestampSchema.required(),
  startedAt: timestampSchema.nullable(),
  shouldEndAt: timestampSchema.required(),
  endedAt: timestampSchema.nullable(),
  durationMinutes: yup.number().required(),
  livekitRoomName: yup.string().nullable(),
  introductionText: yup.string().required(),
});

export type Room = yup.InferType<typeof roomSchema>;
