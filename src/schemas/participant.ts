import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

// Schema for route points (used in directions)
export const routePointSchema = yup.object({
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

// Schema for route distance
export const routeDistanceSchema = yup.object({
  text: yup.string().required(), // Human-readable distance (e.g., "3.2 mi")
  value: yup.number().required(), // Distance in meters
});

// Schema for route duration
export const routeDurationSchema = yup.object({
  text: yup.string().required(), // Human-readable duration (e.g., "10 mins")
  value: yup.number().required(), // Duration in seconds
});

// Schema for route details
export const routeSchema = yup.object({
  points: yup.array().of(routePointSchema).required(),
  distance: routeDistanceSchema.required(),
  duration: routeDurationSchema.required(),
  calculatedAt: timestampSchema,
  estimatedArrivalTime: timestampSchema,
});

// Export types derived from schemas
export type RoutePoint = yup.InferType<typeof routePointSchema>;
export type RouteDistance = yup.InferType<typeof routeDistanceSchema>;
export type RouteDuration = yup.InferType<typeof routeDurationSchema>;
export type Route = yup.InferType<typeof routeSchema>;

/**
 * Base participant schema with simplified properties that will be denormalized into the walk document.
 * These are the properties needed for rendering participant information in the UI.
 */
export const baseParticipantSchema = yup.object({
  id: yup.string(),
  userUid: yup.string().required(),
  displayName: yup.string().required(),
  photoURL: yup.string().nullable(),
  introduction: yup.string().optional(),
  status: yup
    .mixed<"pending" | "on-the-way" | "arrived">()
    .oneOf(["pending", "on-the-way", "arrived"])
    .required(),
  sourceType: yup
    .mixed<"requested" | "invited" | "walk-creator">()
    .oneOf(["requested", "invited", "walk-creator"])
    .required(),
  notifiedEstimatedArrivalTime: timestampSchema.nullable(),
  acceptedAt: timestampSchema.nullable(),
  deniedAt: timestampSchema.nullable(),
  cancelledAt: timestampSchema.nullable(),
  statusUpdatedAt: timestampSchema,
  // After the user rejects a walk invitation, the invite will still be shown on their walks screen
  // until they mark it as hidden
  hiddenAt: timestampSchema.nullable(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

/**
 * Full participant schema that extends the base schema with additional properties
 * that don't need to be denormalized (like location data and route information).
 */
export const participantSchema = baseParticipantSchema.shape({
  lastLocation: yup
    .object({
      latitude: yup.number().required(),
      longitude: yup.number().required(),
      timestamp: timestampSchema,
    })
    .optional()
    .default(undefined),
  route: routeSchema.nullable(),
  // Add navigation method for route calculation
  navigationMethod: yup
    .mixed<"driving" | "walking">()
    .oneOf(["driving", "walking"])
    .default("walking"),
});

export type BaseParticipant = yup.InferType<typeof baseParticipantSchema>;
export type Participant = yup.InferType<typeof participantSchema>;

// Export the extended participant type with route
export type ParticipantWithRoute = Participant & {
  route: Route | null;
};
