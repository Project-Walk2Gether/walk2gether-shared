import * as yup from "yup";
import { objectOf } from "../utils/objectOf";
import { attachmentSchema } from "./attachment";
import { locationSchema, namedLocationSchema } from "./location";
import { meetupTypeSchema } from "./meetupType";
import { timestampSchema } from "./utils/timestamp";

export const locationOptionSchema = yup.object({
  location: namedLocationSchema.required(),
  votes: objectOf(yup.boolean().required()),
  proposedBy: yup.string().optional(), // UID of user who proposed this location
  proposedAt: yup.date().optional(), // When this location was proposed
  isConfirmed: yup.boolean().optional().default(false),
  meetupSpotPhoto: attachmentSchema.optional().default(undefined),
  currentLocation: locationSchema.nullable().default(null),
  startedAt: timestampSchema.nullable(),
  endedAt: timestampSchema.nullable(),
  meetupType: meetupTypeSchema.default("inPerson"), // Default to in-person for backward compatibility
  locationSharing: yup.object().optional(), // Map of participant UIDs to their location sharing preference for this specific location
});

export type LocationOption = yup.InferType<typeof locationOptionSchema>;
