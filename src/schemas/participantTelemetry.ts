import * as yup from "yup";
import { routeSchema } from "./route";
import { timestampSchema } from "./utils/timestamp";

/**
 * Schema for high-frequency participant telemetry data.
 *
 * This is stored as a separate document at:
 *   walks/{walkId}/participants/{participantId}/telemetry/current
 *
 * Moving these fields off the participant document eliminates write contention
 * on participant docs (and the cascading denormalization to the walk document).
 *
 * Fields moved here from participant schema:
 * - lastLocation: written by client every few seconds during a walk
 * - route: smoothed walking route built incrementally by onParticipantLocationCreated
 * - travelRoute: Google Maps directions route to the walk location
 */
export const participantTelemetrySchema = yup.object({
  // Last known GPS position — written by client every few seconds
  lastLocation: yup
    .object({
      latitude: yup.number().required(),
      longitude: yup.number().required(),
      timestamp: timestampSchema,
    })
    .nullable()
    .default(null),

  // Smoothed walking route built up during the walk
  route: routeSchema.nullable().default(null),

  // Google Maps directions route to the walk location
  travelRoute: routeSchema.nullable().default(null),

  updatedAt: timestampSchema,
});

export type ParticipantTelemetry = yup.InferType<
  typeof participantTelemetrySchema
>;
