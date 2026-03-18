import * as yup from "yup";
import { locationSchema } from "./location";
import { routeSchema } from "./route";
import { timestampSchema } from "./utils/timestamp";

export const locationOptionTelemetrySchema = yup.object({
  currentLocation: locationSchema.nullable().default(null),
  route: routeSchema.nullable().default(null),
  updatedAt: timestampSchema,
});

export type LocationOptionTelemetry = yup.InferType<
  typeof locationOptionTelemetrySchema
>;
