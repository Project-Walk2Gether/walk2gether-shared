import * as yup from "yup";
import { objectOf } from "../../utils/objectOf";
import { locationSchema } from "../location";
import { baseParticipantSchema, routeSchema } from "../participant";
import { timestampSchema } from "../utils/timestamp";

export const walkBaseSchema = yup.object({
  id: yup.string(),
  date: timestampSchema.required(),
  currentLocation: locationSchema,
  startLocation: locationSchema,
  durationMinutes: yup.number().required().positive().integer(),
  organizerName: yup.string().required(),
  createdByUid: yup.string().required(),
  route: routeSchema.optional().default(undefined),
  totalDistanceMiles: yup.number(),
  startedAt: timestampSchema,
  endedAt: timestampSchema,
  estimatedEndTime: timestampSchema,
  estimatedEndTimeWithBuffer: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  participantsById: objectOf(baseParticipantSchema),
  participantUids: yup.array().of(yup.string().required()),
  ownerIsInitiallyAtLocation: yup.boolean().optional().default(undefined),
});
