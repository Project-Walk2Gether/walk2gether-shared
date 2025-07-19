import * as yup from "yup";
import { walkBaseSchema } from "./base";

export const meetupWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"meetup">().oneOf(["meetup"]),
  topic: yup.string().required(),
  descriptionMarkdown: yup.string(),
  questionPrompts: yup.array().of(yup.string().required()),
  minimumNumberOfMinutesWithEachPartner: yup
    .number()
    .required()
    .integer()
    .min(0)
    .default(5),
});

export type MeetupWalk = yup.InferType<typeof meetupWalkSchema>;
