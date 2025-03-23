import * as yup from "yup";
import { roundSchema, walkBaseSchema } from "./base";

export const neighborhoodWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"neighborhood">().oneOf(["neighborhood"]),
  numberOfRotations: yup.number().required().integer().min(0),
  rounds: yup.array().of(roundSchema.required()).required(),
});

export type NeighborhoodWalk = yup.InferType<typeof neighborhoodWalkSchema>;
