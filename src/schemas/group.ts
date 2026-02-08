import * as yup from "yup";

export const groupSchema = yup.object({
  name: yup.string().required(),
  invitationCode: yup.string().required(),
  memberUids: yup.array().of(yup.string().required()).required(),
});

export type Group = yup.InferType<typeof groupSchema>;
