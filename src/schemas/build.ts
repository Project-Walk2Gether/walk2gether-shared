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

// expiredByUid value used when a build is expired automatically (new major released)
// rather than by an admin.
export const AUTO_EXPIRY_UID = "auto-expiry";

export const buildPlatformReleaseSchema = yup.object({
  // Set by the build pipeline (record-native-build.js) when a native binary for
  // this platform is cut. A build can only be auto-released if it was primed.
  primedAt: yup.mixed().nullable().default(null),
  // Set when the first production (non-dev) client on this platform reports the
  // version, i.e. the store has approved it and it's in the field.
  confirmedAt: yup.mixed().nullable().default(null),
  confirmedByUid: yup.string().nullable().default(null),
});

export type BuildPlatformRelease = yup.InferType<
  typeof buildPlatformReleaseSchema
>;

export const buildReleaseSchema = yup.object({
  ios: buildPlatformReleaseSchema.nullable().default(null),
  android: buildPlatformReleaseSchema.nullable().default(null),
});

export type BuildRelease = yup.InferType<typeof buildReleaseSchema>;

export const buildSchema = yup.object({
  version: yup.string().required(),
  // Null until a client actually reports the version (pipeline-primed docs
  // exist before any client has been seen).
  firstSeenAt: yup.mixed().nullable().default(null),
  lastSeenAt: yup.mixed().nullable().default(null),
  expiry: buildExpirySchema.nullable().default(null),
  release: buildReleaseSchema.nullable().default(null),
  // Set once every primed platform has been confirmed by a production client.
  // The transition null -> set triggers auto-expiry of older major builds.
  releasedAt: yup.mixed().nullable().default(null),
  createdAt: yup.mixed().required(),
});

export type Build = yup.InferType<typeof buildSchema>;
