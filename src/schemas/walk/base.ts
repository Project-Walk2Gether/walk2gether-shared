import * as yup from "yup";
import { objectOf } from "../../utils/objectOf";
import { attachmentSchema } from "../attachment";
import { locationSchema } from "../location";
import { baseParticipantSchema, routeSchema } from "../participant";
import { roundSchema } from "../round";
import { timestampSchema } from "../utils/timestamp";

export const walkBaseSchema = yup.object({
  id: yup.string(),
  date: timestampSchema.required(),
  currentLocation: locationSchema,
  startLocation: locationSchema,
  durationMinutes: yup.number().required().positive().integer(),
  organizerName: yup.string().required(),
  createdByUid: yup.string().required(),
  upcomingRounds: yup.array().of(roundSchema.required()),
  route: routeSchema.optional().default(undefined),
  totalDistanceMiles: yup.number(),
  startedAt: timestampSchema,
  endedAt: timestampSchema,
  estimatedEndTime: timestampSchema,
  estimatedEndTimeWithBuffer: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  meetupSpotPhoto: attachmentSchema.optional().default(undefined),
  participantsById: objectOf(baseParticipantSchema),
  participantUids: yup.array().of(yup.string().required()),
  ownerIsInitiallyAtLocation: yup.boolean().optional().default(undefined),
});
