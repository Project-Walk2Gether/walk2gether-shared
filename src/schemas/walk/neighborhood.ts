import * as yup from "yup";
import { walkBaseSchema } from "./base";

export const neighborhoodWalkSchema = walkBaseSchema.shape({
  isPublic: yup.mixed<true>().oneOf([true]),
  type: yup.mixed<"neighborhood">().oneOf(["neighborhood"]),
});

export type NeighborhoodWalk = yup.InferType<typeof neighborhoodWalkSchema>;
