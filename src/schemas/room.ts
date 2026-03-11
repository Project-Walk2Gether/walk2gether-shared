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
  distanceWalkedMeters: yup.number().nullable().default(null),
  // Announcement text for when a new member is added to an existing room (third-wheel joining)
  newMemberAnnouncement: yup.string().nullable().default(null),
  // Whether this is the final "all together" room at the end of a walk
  isFinalRoom: yup.boolean().optional().default(false),
});

export type Room = yup.InferType<typeof roomSchema>;
