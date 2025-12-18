import * as yup from "yup";
import { objectOf } from "../utils/objectOf";
import { attachmentSchema } from "./attachment";
import { locationSchema, namedLocationSchema } from "./location";
import { meetupTypeSchema } from "./meetupType";
import { routeSchema } from "./route";
import { timestampSchema } from "./utils/timestamp";

/**
 * Base location option schema - core fields shared between location options and destinations
 */
export const baseLocationOptionSchema = yup.object({
  location: namedLocationSchema.required(),
  votes: objectOf(yup.boolean().required()),
  proposedBy: yup.string().optional(), // UID of user who proposed this location
  proposedAt: yup.date().optional(), // When this location was proposed
  isConfirmed: yup.boolean().optional().default(false),
  photo: attachmentSchema.optional().default(undefined), // Photo of the location (auto-fetched from Google Places if not provided)
});

/**
 * Full location option schema - extends base with walk-specific fields and destinations
 */
export const locationOptionSchema = baseLocationOptionSchema.shape({
  meetupSpotPhoto: attachmentSchema.optional().default(undefined),
  currentLocation: locationSchema.nullable().default(null),
  startedAt: timestampSchema.nullable(),
  endedAt: timestampSchema.nullable(),
  meetupType: meetupTypeSchema.default("inPerson").required(), // Default to in-person for backward compatibility
  route: routeSchema.nullable().optional().default(undefined), // Unified route for this location option (copied from participant routes)

  // Destinations - places to visit during the walk from this starting location
  destinations: yup.array(baseLocationOptionSchema).optional().default([]),
});

export type BaseLocationOption = yup.InferType<typeof baseLocationOptionSchema>;
export type LocationOption = yup.InferType<typeof locationOptionSchema>;

/**
 * Fields added when a LocationOption is stored as a Firestore document
 * These are added during write and available during read
 */
export interface LocationOptionDocumentFields {
  id: string;
  walkId: string;
  index: number; // Order in the list (0-based)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Full LocationOption document as stored in Firestore subcollection
 * Use this type when reading from or writing to the locationOptions subcollection
 */
export type LocationOptionDocument = LocationOption &
  LocationOptionDocumentFields;
