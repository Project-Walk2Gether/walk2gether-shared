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

export const walkBaseSchema = yup.object({
  id: yup.string(),
  invitationCode: yup.string().optional(),
  date: timestampSchema.required(),
  endTime: timestampSchema.required(),
  endTimeWithBuffer: timestampSchema.required(),
  status: yup.string().oneOf(["proposed", "confirmed", "expired"]).required(),
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
});

// Export canonical types
export type WalkBase = yup.InferType<typeof walkBaseSchema>;
