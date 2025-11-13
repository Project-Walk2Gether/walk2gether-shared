import * as yup from "yup";
import { objectOf } from "../utils/objectOf";
import { attachmentSchema } from "./attachment";
import { locationSchema, namedLocationSchema } from "./location";

export const locationOptionSchema = yup.object({
  location: namedLocationSchema.required(),
  votes: objectOf(yup.boolean().required()),
  proposedBy: yup.string().optional(), // UID of user who proposed this location
  proposedAt: yup.date().optional(), // When this location was proposed
  isConfirmed: yup.boolean().optional().default(false),
  meetupSpotPhoto: attachmentSchema.optional().default(undefined),
  currentLocation: locationSchema.nullable().default(null),
});

export type LocationOption = yup.InferType<typeof locationOptionSchema>;
