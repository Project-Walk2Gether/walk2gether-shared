import * as yup from "yup";
import { locationSchema } from "./location";
import { timestampSchema } from "./utils/timestamp";

export const favoriteLocationSchema = yup.object({
  location: locationSchema,
  useCount: yup.number().required().min(1),
  lastUsed: timestampSchema,
});

export type FavoriteLocation = yup.InferType<typeof favoriteLocationSchema>;
