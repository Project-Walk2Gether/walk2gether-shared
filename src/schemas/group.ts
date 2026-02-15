import * as yup from "yup";

export const groupSchema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  invitationCode: yup.string().required(),
  memberUids: yup.array().of(yup.string().required()).required(),
  createdByUid: yup.string().required(),
  departedMemberUids: yup
    .array()
    .of(yup.string().required())
    .required()
    .default([]),
});

export type Group = yup.InferType<typeof groupSchema>;
