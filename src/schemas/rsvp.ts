import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const rsvpSchema = yup.object({
  id: yup.string(),
  userId: yup.string().required(),
  walkId: yup.string().required(),
  timestamp: timestampSchema,
});

export type RSVP = yup.InferType<typeof rsvpSchema>;
