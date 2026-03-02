import * as yup from "yup";

export const communitySchema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  description: yup.string().nullable().default(null),
  adminUids: yup.array().of(yup.string().required()).required(),
  groupIds: yup.array().of(yup.string().required()).required().default([]),
  createdAt: yup.mixed().required(),
  updatedAt: yup.mixed().nullable().default(null),
  logoUrl: yup.string().nullable().default(null),
});

export type Community = yup.InferType<typeof communitySchema>;
