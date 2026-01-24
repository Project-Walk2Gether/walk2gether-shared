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

export type Location = yup.InferType<typeof locationSchema>;
export type NamedLocation = yup.InferType<typeof namedLocationSchema>;
