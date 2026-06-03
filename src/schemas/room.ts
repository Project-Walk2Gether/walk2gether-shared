import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";
import { walkRecentMessageSchema } from "./walk/recentMessage";

/**
 * Room schema for the new rooms system that replaces rounds.
 * Rooms can be either:
 * - "friends": a room between two people that know each other
 * - "group": a room between two or more people that likely don't know each other
 * - "aiAssistant": a 1:1 room between a single user and the Chester AI assistant
 * - "aiFeedback": a 1:1 end-of-walk debrief room where Chester asks the user
 *   structured feedback questions
 */
export const roomSchema = yup.object({
  id: yup.string(),
  walkId: yup.string().required(),
  type: yup
    .mixed<"friends" | "group" | "aiAssistant" | "aiFeedback">()
    .oneOf(["friends", "group", "aiAssistant", "aiFeedback"])
    .required(),
  memberUids: yup.array().of(yup.string().required()).required(),
  thirdWheelMemberUids: yup
    .array()
    .of(yup.string().required())
    .required()
    .default([]),
  thirdWheelJoinedAt: timestampSchema.nullable().default(null),

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
  memberStepsAtStart: yup
    .mixed<Record<string, number>>()
    .nullable()
    .default(null),
  memberStepsAtEnd: yup
    .mixed<Record<string, number>>()
    .nullable()
    .default(null),
  memberStepsWalked: yup
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
  // Structured questions for an "aiFeedback" debrief room, resolved and stamped
  // at room creation (per-walk override → global default → fallback).
  feedbackQuestions: yup.array().of(yup.string().required()).optional(),
  // Set by the Chester agent once it has joined and its session is live. Clients
  // watch this to flip from "Connecting…" to "Chester is listening" rather than
  // relying on counting LiveKit participants. Only present on aiFeedback rooms.
  agentConnectedAt: timestampSchema.nullable(),
  // Live Chester agent state, mirrored from the LiveKit agent session's
  // state-changed events. Clients watch this to show a speaking indicator
  // (animated waveform) while Chester talks. Null when no agent is present /
  // cleared on session end.
  agentState: yup
    .mixed<"initializing" | "idle" | "listening" | "thinking" | "speaking">()
    .oneOf(["initializing", "idle", "listening", "thinking", "speaking"])
    .nullable()
    .default(null),
});

export type Room = yup.InferType<typeof roomSchema>;
