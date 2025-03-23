import * as yup from "yup";
import { roundSchema, walkBaseSchema } from "./base";

export const neighborhoodWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"neighborhood">().oneOf(["neighborhood"]),
  minimumNumberOfMinutesWithEachPartner: yup
    .number()
    .required()
    .integer()
    .min(0)
    .default(5),
  rounds: yup.array().of(roundSchema.required()).required(),
});

export type NeighborhoodWalk = yup.InferType<typeof neighborhoodWalkSchema>;
