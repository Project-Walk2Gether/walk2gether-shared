import * as yup from "yup";
import { roundSchema, walkBaseSchema } from "./base";

export const meetupWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"meetup">().oneOf(["meetup"]),
  topic: yup.string().required(),
  minimumNumberOfMinutesWithEachPartner: yup
    .number()
    .required()
    .integer()
    .min(0)
    .default(5),
  rounds: yup.array().of(roundSchema.required()).required(),
});

export type MeetupWalk = yup.InferType<typeof meetupWalkSchema>;
