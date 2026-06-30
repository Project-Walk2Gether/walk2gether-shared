import * as yup from "yup";
import { objectOf } from "../../utils/objectOf";
import { meetupTypeSchema } from "../meetupType";
import { baseParticipantSchema } from "../participant";
import { walkRecentMessageSchema } from "./recentMessage";
import { timestampSchema } from "../utils/timestamp";

export const recurrenceUnits = ["weeks", "months"] as const;
export type RecurrenceUnit = (typeof recurrenceUnits)[number];

export const recurrenceSchema = yup
  .object({
    unit: yup.string().oneOf([...recurrenceUnits]).required(),
    interval: yup.number().required().positive().integer().min(1).max(12),
  })
  .optional()
  .nullable()
  .default(null);

export type Recurrence = yup.InferType<typeof recurrenceSchema>;

/**
 * A concrete time slot offered to the invitee when the walk is created in
 * "availability" scheduling mode. Times are absolute UTC instants; the invitee
 * sees them rendered in their own timezone and picks one to set the walk time.
 */
export const proposedSlotSchema = yup.object({
  id: yup.string().required(),
  startUtc: timestampSchema.required(),
  endUtc: timestampSchema.required(),
});

export type ProposedSlot = yup.InferType<typeof proposedSlotSchema>;

export const walkBaseSchema = yup.object({
  id: yup.string(),
  invitationCode: yup.string().optional(),
  date: timestampSchema.required(),
  endTime: timestampSchema.required(),
  endTimeWithBuffer: timestampSchema.required(),
  status: yup.string().oneOf(["proposed", "confirmed", "expired"]).required(),
  // How the walk time is decided:
  // - "proposed": creator picks a fixed time (the existing flow). date is final.
  // - "availability": creator offers proposedSlots; status stays "proposed" and
  //   date holds the earliest slot as a placeholder until the invitee picks one
  //   (via the chooseWalkSlot callable), which confirms the walk.
  // Optional for back-compat: existing/legacy walks with no schedulingMode are
  // treated as "proposed" (a fixed time) by readers. No default() so the
  // inferred type stays optional and existing construction sites don't break.
  schedulingMode: yup
    .string()
    .oneOf(["proposed", "availability"])
    .optional(),
  proposedSlots: yup.array().of(proposedSlotSchema).optional(),
  durationMinutes: yup.number().required().positive().integer(),
  organizerName: yup.string().required(),
  createdByUid: yup.string().required(),
  allowLocationSuggestions: yup.boolean().optional().default(true),
  totalDistanceMiles: yup.number(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  // When the walk actually started and ended (set at runtime)
  startedAt: timestampSchema.nullable(),
  endedAt: timestampSchema.nullable(),
  // Set once friendship step counts have been aggregated for this walk, so the
  // walk-end aggregation runs exactly once. See aggregateFriendshipSteps.
  stepsAggregatedAt: timestampSchema.nullable(),
  // Whether in-person or remote, or both
  meetupType: meetupTypeSchema.required(),
  visibility: yup.string().oneOf(["public", "private"]).required(),
  participantsById: objectOf(baseParticipantSchema).optional(),
  recentMessagesByUserId: objectOf(walkRecentMessageSchema).optional(),
  participantUids: yup.array().of(yup.string().required()),
  groupId: yup.string().optional(),
  ownerIsInitiallyAtLocation: yup.boolean().optional().default(undefined),
  allowParticipantInvites: yup.boolean().optional().default(false),
  // URL of the generated selfie collage image for this walk
  collageUrl: yup.string().url().nullable().default(null),
  dayBeforeReminderSentAt: timestampSchema.optional().nullable(),
  recurrence: recurrenceSchema,
  recurrenceGroupId: yup.string().optional().nullable().default(null),
  nextWalkId: yup.string().optional().nullable().default(null),
  // Optional per-walk override for the end-of-walk Chester debrief questions.
  // When unset, the global default (config/feedback) is used.
  feedbackQuestions: yup.array().of(yup.string().required()).optional(),
});

// Export canonical types
export type WalkBase = yup.InferType<typeof walkBaseSchema>;
