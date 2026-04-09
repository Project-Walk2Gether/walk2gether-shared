import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";
import { walkRecentMessageSchema } from "./walk/recentMessage";

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
  thirdWheelMemberUids: yup
    .array()
    .of(yup.string().required())
    .required()
    .default([]),

  conversationStarterPrompt: yup.string().optional(),
  isActive: yup.boolean().required(),
  isFirstRoomFor: yup.mixed<Record<string, boolean>>().nullable().default(null),
  createdAt: timestampSchema.required(),
  startedAt: timestampSchema.nullable(),
  shouldEndAt: timestampSchema.nullable(),
  endedAt: timestampSchema.nullable(),
  durationMinutes: yup.number().required(),
  livekitRoomName: yup.string().nullable(),
  introductionText: yup.string().required(),
  staticIntroductionText: yup.string().required(),
  memberDistanceAtStartMeters: yup
    .mixed<Record<string, number>>()
    .nullable()
    .default(null),
  memberDistanceAtEndMeters: yup
    .mixed<Record<string, number>>()
    .nullable()
    .default(null),
  memberDistanceWalkedMeters: yup
    .mixed<Record<string, number>>()
    .nullable()
    .default(null),
  // Denormalized last chat message sent in this room
  lastMessage: walkRecentMessageSchema.nullable().default(null),
  // Whether this is the final "all together" room at the end of a walk
  isFinalRoom: yup.boolean().optional().default(false),
  // Action to complete before connecting to this room (e.g. "selfie")
  preConnection: yup
    .mixed<"selfie">()
    .oneOf(["selfie"])
    .nullable()
    .default(null),
});

export type Room = yup.InferType<typeof roomSchema>;
