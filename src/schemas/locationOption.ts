import * as yup from "yup";
import { objectOf } from "../utils/objectOf";
import { attachmentSchema } from "./attachment";
import { locationSchema } from "./location";

export const locationOptionSchema = yup.object({
  location: locationSchema.required(),
  votes: objectOf(yup.boolean().required()),
  images: yup.array().of(attachmentSchema.required()).optional().default([]),
  proposedBy: yup.string().optional(), // UID of user who proposed this location
  proposedAt: yup.date().optional(), // When this location was proposed
});

export type LocationOption = yup.InferType<typeof locationOptionSchema>;
