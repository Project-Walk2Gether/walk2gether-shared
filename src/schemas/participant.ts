import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const participantSchema = yup.object({
  userUids: yup.array().of(yup.string().required()).required(),
  displayName: yup.string().required(),
  photoURL: yup.string().optional(),
  lastLocation: yup.object().optional(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Participant = yup.InferType<typeof participantSchema>;
