import * as yup from "yup";
import { documentReferenceSchema } from "../firestore/documentReference";
import { availabilitySchema } from "./availability";
import { locationSchema } from "./location";
import { meetupTypeSchema } from "./meetupType";
import {
  Route,
  RouteDistance,
  RouteDuration,
  RoutePoint,
  routeSchema,
} from "./route";
import { timestampSchema } from "./utils/timestamp";

// Re-export route types for backward compatibility
export type { Route, RouteDistance, RouteDuration, RoutePoint };

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
  timezone: yup.string().required(),
  availability: availabilitySchema.optional().default(undefined),
  status: yup
    .mixed<
      | "pending"
      | "on-the-way"
      | "arrived"
      | "ready"
      | "running-late"
      | "connected"
    >()
    .oneOf([
      "pending",
      "on-the-way",
      "arrived",
      "ready",
      "running-late",
      "connected",
    ])
    .required(),
  sourceType: yup
    .mixed<"requested" | "invited" | "walk-creator">()
    .oneOf(["requested", "invited", "walk-creator"])
    .required(),
  notifiedEstimatedArrivalTime: timestampSchema.nullable(),
  acceptedAt: timestampSchema.nullable(),
  interestExpressedAt: timestampSchema.nullable(),
  deniedAt: timestampSchema.nullable(),
  cancelledAt: timestampSchema.nullable(),
  statusUpdatedAt: timestampSchema.nullable(),
  suggestedDepartureTime: timestampSchema.nullable(),
  suggestedDepartureNotificationSentAt: timestampSchema.nullable().defined(),
  agentStartedSpeakingAt: timestampSchema.nullable(),
  agentFinishedSpeakingAt: timestampSchema.nullable(),
  // Estimated time of arrival - used when participant is running late
  eta: timestampSchema.nullable(),
  // After the user rejects a walk invitation, the invite will still be shown on their walks screen
  // until they mark it as hidden
  hiddenAt: timestampSchema.nullable(),
  // Track which location option the participant has chosen (for remote or multi-location walks)
  // Reference to locationOption document ID in subcollection
  chosenLocationOptionId: yup.string().optional(),
  // Whether this participant has opted in to sharing their location with other participants
  isLocationShared: yup.boolean().default(true),
  // Meetup type - whether participant is joining in-person or remotely
  meetupType: meetupTypeSchema,
  // Home location for remote participants (needed for location options)
  // Uses full locationSchema to include city and displayName for UI display
  homeLocation: locationSchema.nullable().default(null),
  // Reference to the participant's current room document (waiting room or pair room)
  roomDoc: documentReferenceSchema.nullable().default(null),
  // Timestamp when participant confirmed they're ready to join the call from waiting room
  readyAt: timestampSchema.nullable(),
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
  route: routeSchema.nullable().optional().default(undefined),
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
