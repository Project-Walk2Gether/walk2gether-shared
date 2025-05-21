import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const locationSchema = yup.object({
  name: yup.string(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  placeId: yup.string(),
  notes: yup.string(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

export const namedLocationSchema = locationSchema.shape({
  name: yup.string().required(),
});

export type Location = yup.InferType<typeof locationSchema>;
export type NamedLocation = yup.InferType<typeof namedLocationSchema>;
