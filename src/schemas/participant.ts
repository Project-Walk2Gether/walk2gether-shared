import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const participantSchema = yup.object({
  id: yup.string(),
  userUid: yup.string().required(),
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
