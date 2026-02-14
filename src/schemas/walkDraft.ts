import * as yup from "yup";
import { meetupTypeSchema } from "./meetupType";
import { timestampSchema } from "./utils/timestamp";

export const walkDraftSchema = yup.object({
  id: yup.string(),
  walkId: yup.string().required(),
  invitationCode: yup.string().required(),
  organizerName: yup.string().required(),
  createdByUid: yup.string().required(),
  type: yup.string().oneOf(["friends", "group"]).required(),
  meetupType: meetupTypeSchema.required(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type WalkDraft = yup.InferType<typeof walkDraftSchema>;
