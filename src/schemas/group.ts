import * as yup from "yup";

export const groupSchema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  description: yup.string().nullable().default(null),
  invitationCode: yup.string().required(),
  createdByUid: yup.string().required(),
  communityId: yup.string().nullable().default(null),
});

export type Group = yup.InferType<typeof groupSchema>;
