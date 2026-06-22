import * as yup from "yup";
import { attachmentSchema } from "./attachment";
import { timestampSchema } from "./utils/timestamp";

export const locationSchema = yup.object({
  id: yup.string(),
  name: yup.string(),
  displayName: yup.string().required(), // City, state, country format for admin display
  city: yup.string().required(),
  country: yup.string().required(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  placeId: yup.string(),
  notes: yup.string(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

export const namedLocationSchema = locationSchema.shape({
  name: yup.string().required(),
  imageAttachment: attachmentSchema.optional().default(undefined),
});

/**
 * GPS-derived "where the user is right now", reverse-geocoded from foreground
 * location. Distinct from the manually-set home `location`/`homeLocation` —
 * lighter shape (no country/placeId) and carries an `updatedAt` for recency.
 */
export const currentLocationSchema = yup.object({
  city: yup.string().required(),
  displayName: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  updatedAt: timestampSchema,
});

export type Location = yup.InferType<typeof locationSchema>;
export type NamedLocation = yup.InferType<typeof namedLocationSchema>;
export type CurrentLocation = yup.InferType<typeof currentLocationSchema>;
