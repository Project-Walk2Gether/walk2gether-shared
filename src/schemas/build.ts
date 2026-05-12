import * as yup from "yup";

export const BUILDS_COLLECTION = "builds";

export const buildExpiryTypeSchema = yup
  .string()
  .oneOf(["forced", "optional"])
  .required();

export type BuildExpiryType = yup.InferType<typeof buildExpiryTypeSchema>;

export const buildExpirySchema = yup.object({
  type: buildExpiryTypeSchema,
  message: yup.string().nullable().default(null),
  expiredAt: yup.mixed().required(),
  expiredByUid: yup.string().required(),
});

export type BuildExpiry = yup.InferType<typeof buildExpirySchema>;

export const buildSchema = yup.object({
  version: yup.string().required(),
  firstSeenAt: yup.mixed().required(),
  lastSeenAt: yup.mixed().required(),
  expiry: buildExpirySchema.nullable().default(null),
  createdAt: yup.mixed().required(),
});

export type Build = yup.InferType<typeof buildSchema>;
