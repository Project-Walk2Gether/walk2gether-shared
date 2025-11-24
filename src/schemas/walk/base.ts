import * as yup from "yup";
import { objectOf } from "../../utils/objectOf";
import { walkMeetupTypeSchema } from "../meetupType";
import { baseParticipantSchema } from "../participant";
import { roundSchema } from "../round";
import { timestampSchema } from "../utils/timestamp";

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
  upcomingRounds: yup.array().of(roundSchema.required()),
  allowLocationSuggestions: yup.boolean().optional().default(true),
  totalDistanceMiles: yup.number(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  // Whether in-person or remote, or both
  meetupType: walkMeetupTypeSchema.required(),
  visibility: yup.string().oneOf(["public", "private"]).required(),
  participantsById: objectOf(baseParticipantSchema).optional(),
  participantUids: yup.array().of(yup.string().required()),
  ownerIsInitiallyAtLocation: yup.boolean().optional().default(undefined),
});

// Export canonical types
export type WalkBase = yup.InferType<typeof walkBaseSchema>;
