import * as yup from "yup";
import { routeSchema } from "./route";
import { timestampSchema } from "./utils/timestamp";

export const locationOptionTelemetrySchema = yup.object({
  route: routeSchema.nullable().default(null),
  updatedAt: timestampSchema,
});

export type LocationOptionTelemetry = yup.InferType<
  typeof locationOptionTelemetrySchema
>;
