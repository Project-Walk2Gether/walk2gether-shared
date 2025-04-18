import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const participantSchema = yup.object({
  id: yup.string(),
  userUids: yup.array().of(yup.string().required()).required(),
  displayName: yup.string().required(),
  photoURL: yup.string().nullable(),
  lastLocation: yup.object({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    timestamp: timestampSchema,
  }),
  approvedAt: timestampSchema.nullable(),
  rejectedAt: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Participant = yup.InferType<typeof participantSchema>;
