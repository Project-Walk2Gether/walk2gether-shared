import * as yup from "yup";
import { objectOf } from "../../utils/objectOf";
import { attachmentSchema } from "../attachment";
import { locationSchema } from "../location";
import { locationOptionSchema } from "../locationOption";
import { baseParticipantSchema, routeSchema } from "../participant";
import { roundSchema } from "../round";
import { timestampSchema } from "../utils/timestamp";

export const walkBaseSchema = yup.object({
  id: yup.string(),
  date: timestampSchema.required(),
  status: yup.string().oneOf(["proposed", "confirmed", "expired"]).required(),
  locationOptions: yup.array().of(locationOptionSchema).optional(),
  chosenLocationIndex: yup.number().nullable().optional(), // Index of the chosen location in locationOptions array
  currentLocation: locationSchema.nullable().default(null),
  durationMinutes: yup.number().required().positive().integer(),
  organizerName: yup.string().required(),
  createdByUid: yup.string().required(),
  upcomingRounds: yup.array().of(roundSchema.required()),
  route: routeSchema.optional().default(undefined),
  allowLocationSuggestions: yup.boolean().optional().default(true),
  totalDistanceMiles: yup.number(),
  startedAt: timestampSchema,
  endTime: timestampSchema,
  endTimeWithBuffer: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  meetupSpotPhoto: attachmentSchema.optional().default(undefined),
  participantsById: objectOf(baseParticipantSchema).optional(),
  participantUids: yup.array().of(yup.string().required()),
  ownerIsInitiallyAtLocation: yup.boolean().optional().default(undefined),
});

// Export canonical types
export type WalkBase = yup.InferType<typeof walkBaseSchema>;
