import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

// Schema for route points (used in directions)
export const routePointSchema = yup.object({
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

// Schema for route distance
export const routeDistanceSchema = yup.object({
  text: yup.string().required(),  // Human-readable distance (e.g., "3.2 mi")
  value: yup.number().required(), // Distance in meters
});

// Schema for route duration
export const routeDurationSchema = yup.object({
  text: yup.string().required(),  // Human-readable duration (e.g., "10 mins")
  value: yup.number().required(), // Duration in seconds
});

// Schema for route details
export const routeSchema = yup.object({
  points: yup.array().of(routePointSchema).required(),
  distance: routeDistanceSchema.required(),
  duration: routeDurationSchema.required(),
  calculatedAt: timestampSchema,
});

// Export types derived from schemas
export type RoutePoint = yup.InferType<typeof routePointSchema>;
export type RouteDistance = yup.InferType<typeof routeDistanceSchema>;
export type RouteDuration = yup.InferType<typeof routeDurationSchema>;
export type Route = yup.InferType<typeof routeSchema>;

export const participantSchema = yup.object({
  id: yup.string(),
  userUid: yup.string().required(),
  displayName: yup.string().required(),
  photoURL: yup.string().nullable(),
  lastLocation: yup.object({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    timestamp: timestampSchema,
  }),
  route: routeSchema.nullable(),
  status: yup
    .mixed<"pending" | "on-the-way" | "arrived">()
    .oneOf(["pending", "on-the-way", "arrived"])
    .required(),
  // Add navigation method for route calculation
  navigationMethod: yup
    .mixed<"driving" | "walking">()
    .oneOf(["driving", "walking"])
    .default("walking"),
  approvedAt: timestampSchema.nullable(),
  rejectedAt: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Participant = yup.InferType<typeof participantSchema>;

// Export the extended participant type with route
export type ParticipantWithRoute = Participant & {
  route: Route | null;
};
