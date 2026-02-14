import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

/**
 * Room schema for the new rooms system that replaces rounds.
 * Rooms can be either:
 * - "waiting": Individual waiting rooms where participants start before joining the main call
 * - "pair": Conversation rooms where 2-3 participants are paired together
 */
export const roomSchema = yup.object({
  id: yup.string(),
  walkId: yup.string().required(),
  type: yup
    .mixed<"friends" | "group" | "waiting">()
    .oneOf(["friends", "group", "waiting"])
    .required(),
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
