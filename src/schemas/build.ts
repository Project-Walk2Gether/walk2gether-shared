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

// Per-platform expiry, layered on top of the build-wide `expiry`. A client uses
// its platform's entry when set, else the build-wide one (see resolveBuildExpiry).
// Only binaries from 1.23 onward read this: the fingerprint runtime means older
// binaries never receive the JS that knows about it, so they only see `expiry`.
export const buildExpiryByPlatformSchema = yup.object({
  ios: buildExpirySchema.nullable().default(null),
  android: buildExpirySchema.nullable().default(null),
});

export type BuildExpiryByPlatform = yup.InferType<
  typeof buildExpiryByPlatformSchema
>;

// expiredByUid value used when a build is expired automatically (a newer major
// or minor released) rather than by an admin.
export const AUTO_EXPIRY_UID = "auto-expiry";

export const buildPlatformReleaseSchema = yup.object({
  // Set by the build pipeline (record-native-build.js) when a native binary for
  // this platform is cut. A build can only be auto-released if it was primed.
  primedAt: yup.mixed().nullable().default(null),
  // Set when the first production (non-dev) client on this platform reports the
  // version, i.e. the store has approved it and it's in the field. This is the
  // platform's release: the transition null -> set triggers auto-expiry of older
  // builds on this platform (expiryByPlatform).
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
  expiryByPlatform: buildExpiryByPlatformSchema.nullable().default(null),
  release: buildReleaseSchema.nullable().default(null),
  // Set once every primed platform has been confirmed by a production client.
  // The transition null -> set triggers build-wide auto-expiry of older builds
  // (older major or minor), which is what pre-1.23 binaries see.
  releasedAt: yup.mixed().nullable().default(null),
  createdAt: yup.mixed().required(),
});

export type Build = yup.InferType<typeof buildSchema>;

/**
 * The expiry a client on `platform` should act on: its platform's entry when
 * set, else the build-wide one.
 */
export function resolveBuildExpiry(
  build: Pick<Build, "expiry" | "expiryByPlatform"> | null | undefined,
  platform: string,
): BuildExpiry | null {
  if (!build) return null;
  const byPlatform =
    platform === "ios" || platform === "android"
      ? build.expiryByPlatform?.[platform]
      : null;
  return byPlatform ?? build.expiry ?? null;
}
