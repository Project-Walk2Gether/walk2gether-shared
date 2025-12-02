import * as yup from "yup";
import { objectOf } from "../utils/objectOf";
import { attachmentSchema } from "./attachment";
import { locationSchema, namedLocationSchema } from "./location";
import { meetupTypeSchema } from "./meetupType";
import { routeSchema } from "./route";
import { timestampSchema } from "./utils/timestamp";

/**
 * Base location option schema - used for both array items and subcollection documents
 */
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
  meetupType: meetupTypeSchema.default("inPerson").required(), // Default to in-person for backward compatibility
  locationSharing: yup.object().optional(), // Map of participant UIDs to their location sharing preference for this specific location
  route: routeSchema.nullable().optional().default(undefined), // Unified route for this location option (copied from participant routes)
});

/**
 * Location option document schema - for subcollection documents
 * Extends base schema with document metadata
 */
export const locationOptionDocumentSchema = locationOptionSchema.shape({
  id: yup.string().required(),
  walkId: yup.string().required(),
  index: yup.number().required().min(0).integer(), // Order in the list (0-based)
  createdAt: timestampSchema.required(),
  updatedAt: timestampSchema.required(),
});

export type LocationOption = yup.InferType<typeof locationOptionSchema>;
export type LocationOptionDocument = yup.InferType<
  typeof locationOptionDocumentSchema
>;
