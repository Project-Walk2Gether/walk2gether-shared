import { keyBy, reduce } from "lodash";
import * as yup from "yup";
import { documentReferenceSchema } from "../firestore/documentReference";
import { availabilitySchema } from "./availability";
import { currentLocationSchema } from "./location";
import { timestampSchema } from "./utils/timestamp";

/**
 * Notification preference types and their associated information
 */
export interface NotificationPreferenceInfo {
  key: string;
  label: string;
  description: string;
  defaultValue?: boolean;
}

/**
 * Canonical definition of all notification preferences
 */
export const NOTIFICATION_PREFERENCES: NotificationPreferenceInfo[] = [
  {
    key: "friendETA",
    label: "Friend ETA Updates",
    description: "Receive notifications when friends are on their way to walks",
    defaultValue: true,
  },
  {
    key: "newNeighborhoodWalks",
    label: "New Neighborhood Walks",
    description: "Be notified when new walks are created in your neighborhood",
    defaultValue: true,
  },
  {
    key: "invitedToFriendWalks",
    label: "Walk Invitations",
    description: "Receive notifications when friends invite you to walks",
    defaultValue: true,
  },
  {
    key: "callStarted",
    label: "Call Started",
    description:
      "Be notified when someone joins the call for a remote walk you're in",
    defaultValue: true,
  },
  {
    // Key kept as-is to preserve existing users' opt-out choices; this now
    // controls the "+24h after invite" reminder to respond (not a day-before).
    key: "walkDayBeforeReminder",
    label: "Walk Reminders",
    description:
      "Get a reminder to respond to walk invitations you haven't answered yet",
    defaultValue: true,
  },
];

/**
 * Map of notification preference keys to their display information
 * (derived from the canonical list)
 */
export const notificationPreferenceLabels: Record<
  string,
  NotificationPreferenceInfo
> = keyBy(NOTIFICATION_PREFERENCES, "key");

/**
 * Schema for user notification preferences
 * (derived from the canonical list)
 */
export const notificationPreferencesSchema = yup.object(
  reduce(
    NOTIFICATION_PREFERENCES,
    (acc, pref) => {
      acc[pref.key] = yup.boolean().optional();
      return acc;
    },
    {} as Record<string, yup.BooleanSchema>,
  ),
);

/**
 * Walking cadence options captured during onboarding. The numeric value is the
 * target number of walks per week and is what gets stored on `walksPerWeek`.
 */
export interface WalksPerWeekOption {
  value: 1 | 2 | 3;
  label: string;
  description: string;
}

export const WALKS_PER_WEEK_OPTIONS: WalksPerWeekOption[] = [
  { value: 1, label: "Gentle", description: "1 walk a week" },
  { value: 2, label: "Moderate", description: "2 walks a week" },
  { value: 3, label: "Active", description: "3 walks a week" },
];

export const DEFAULT_WALKS_PER_WEEK = 2 as const;

export const userDataSchema = yup.object({
  id: yup.string(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  // Combined "First Last", kept derived from firstName/lastName for backward
  // compatibility with the many places that still read `name`.
  name: yup.string().required(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  lastActiveAt: timestampSchema,
  tourDismissedAt: timestampSchema,
  timezone: yup.string().required(), // IANA timezone (e.g., "America/New_York")
  profilePicUrl: yup.string().url().optional(),
  linkedInProfileUrl: yup.string().url().optional(),
  friendInvitationCode: yup.string(),
  // Set when this user signed up by following someone's friend-invite link. The
  // friendship itself is created at auth time; these persist WHO invited them so
  // onboarding can greet them by the inviter's name without a lookup ("Simon
  // thought of you"). Absent for organic sign-ups.
  referredByUid: yup.string().optional().nullable(),
  referredByName: yup.string().optional().nullable(),
  referredByPhotoUrl: yup.string().optional().nullable(),
  expoPushToken: yup.string().nullable(),
  expoPushTokenSetAt: timestampSchema,
  appVersion: yup.string().optional(),
  appVersionSetAt: timestampSchema,
  deviceInfo: yup.mixed(),
  aboutMe: yup.string().optional(),
  // Whether the user's "about me" should be used when introducing them in
  // group walks. Opt-in: defaults to false unless the user turns it on.
  includeAboutMeInIntroductions: yup.boolean().default(false),
  // Recurring "template" availability captured during onboarding. Seeds each
  // week's confirmation prompt; the per-week confirmed availability lives in the
  // users/{uid}/weeklyAvailability subcollection.
  availability: availabilitySchema.optional().default(undefined),
  // Week key ("YYYY-MM-DD" Monday) of the last week we sent the availability-
  // confirmation WhatsApp prompt for. Dedupes the weekly prompt scheduler.
  availabilityPromptSentForWeekOf: yup.string().optional().nullable(),
  // Whether the weekly matcher may schedule this user into walks with their
  // accepted friends. Opt-IN with a split default: new accounts are created
  // with `true`; for existing users the field is absent, which counts as OFF —
  // only an explicit `true` includes them in friend matching. (Group matching
  // is governed separately by each membership's optIntoAutomaticMatching.)
  friendMatchingEnabled: yup.boolean().optional(),
  // Desired walking cadence, captured during onboarding and used for matching.
  // 1 = Gentle, 2 = Moderate, 3 = Active. null until the user has chosen.
  walksPerWeek: yup
    .number()
    .oneOf([1, 2, 3])
    .nullable()
    .default(null),
  topics: yup.array().of(yup.string().required()).optional().default(undefined),
  topicRankings: yup
    .array()
    .of(
      yup.object({
        topic: yup.string().required(),
        rank: yup.number().required().positive().integer(),
      }),
    )
    .optional()
    .default(undefined),
  notificationPreferences: notificationPreferencesSchema,
  notificationsPermissionsSetAt: timestampSchema,
  // Whether we may proactively message this user on WhatsApp (the weekly
  // availability prompt, walk invitations, group-walk confirmations). Opt-IN:
  // only an explicit `true` permits a proactive send, so absent means off.
  //
  // This was opt-out until 2026-08-18, on the reasoning that existing users had
  // always been messaged on the strength of a phoneNumber alone. That reasoning
  // was wrong: a number given to log in is not consent to be messaged, and the
  // default silently enrolled every new signup. It produced two complaints
  // (Sonya Ramsey 2026-07-28, Tonya Lockamy 2026-08-17) and a mass-disable
  // sweep whose own note said it was "a stopgap until the consent gate is
  // fixed". This is that gate.
  //
  // Consent is recorded explicitly in exactly two places: the Me-screen toggle,
  // and findOrCreateUser for someone who messages the bot first. Read it via
  // isWhatsappEnabled() — never test the field directly, or absent will slip
  // through as permitted. Note this gates proactive sends only; if the user
  // messages the bot, it still replies.
  whatsappEnabled: yup.boolean().default(false),
  distanceUnit: yup
    .mixed<"km" | "mi">()
    .oneOf(["km", "mi"])
    .optional()
    .default("mi"),
  phoneNumber: yup.string().optional(),
  // Quote tracking
  currentQuoteIndex: yup.number().default(0),
  neighborhoodWalksHowItWorksDontShowAgain: yup.boolean().default(false),
  remoteWalksHowItWorksDontShowAgain: yup.boolean().default(false),
  // User activity tracking
  hasCreatedNeighborhoodWalk: yup.boolean().default(false),
  walkCount: yup.number().default(0),
  // Agentic accounts flag
  isAgent: yup.boolean().default(false),
  // Developer/maintainer accounts. A developer's own device is a genuine App
  // Store / Play Store install once they update — same installSource as any
  // real user — so it would otherwise be indistinguishable from a real-world
  // confirmation that a release has gone live. Excluded from build-release
  // confirmation (maybeConfirmBuildRelease in functions) so the developer
  // dogfooding a fresh release can't mark it "live" ahead of actual users.
  isDeveloper: yup.boolean().default(false),
  // UI context: which plan the user is actively discussing in the plan screen
  activelyDiscussingPlanDoc: documentReferenceSchema.optional().nullable(),
  // AI response processing indicator
  aiResponseProcessingStartedAt: timestampSchema.optional().nullable(),
  // Whether the user allows location sharing for group walks (null = not yet decided)
  allowLocationSharingForGroupWalks: yup.boolean().nullable().default(null),
  stepsTrackingEnabled: yup.boolean().default(false),
  // Per-user opt-in for background route tracking. When true, the full GPS
  // route is recorded (and streamed to Firestore) during walks; when false
  // (the default) walks only record city + step count. Off by default.
  routeTrackingEnabled: yup.boolean().default(false),
  // Per-user opt-in for the iOS Live Activity feature, toggled from admin.
  // Used to enable it for specific testers while it's gated off globally.
  liveActivitiesEnabled: yup.boolean().default(false),
  // Version of the privacy policy the user agreed to during signup
  agreedPrivacyPolicyVersion: yup.number().nullable().default(null),
  // Version of the Terms of Service (EULA) the user explicitly agreed to at
  // signup (TERMS_OF_SERVICE_VERSION in schemas/legalDocument.ts). Required
  // by App Store Guideline 1.2: agreement must be explicit, not implied.
  agreedTermsOfServiceVersion: yup.number().nullable().default(null),
  // Uids this user has blocked. Content from blocked users is hidden
  // client-side immediately; each block also files a report for review.
  blockedUserIds: yup.array().of(yup.string().required()).optional(),
  // Set when moderation ejects the user for objectionable content. A banned
  // user is signed out and cannot use the app.
  bannedAt: timestampSchema.optional().nullable(),
  // Location permission status (synced from device for observability)
  locationPermissions: yup
    .object({
      foreground: yup
        .mixed<"granted" | "denied" | "undetermined">()
        .oneOf(["granted", "denied", "undetermined"])
        .required(),
      background: yup
        .mixed<"granted" | "denied" | "undetermined">()
        .oneOf(["granted", "denied", "undetermined"])
        .required(),
      updatedAt: timestampSchema,
      platform: yup.mixed<"ios" | "android">().oneOf(["ios", "android"]),
    })
    .optional()
    .nullable()
    .default(null),
  walkTourDismissedAt: timestampSchema.optional().nullable(),
  roomTourDismissedAt: timestampSchema.optional().nullable(),
  // GPS-derived current location, updated when the user opens the app with location permission
  currentLocation: currentLocationSchema.optional().nullable().default(null),
});

export type UserData = yup.InferType<typeof userDataSchema>;

/**
 * Whether we may proactively message this user on WhatsApp.
 *
 * Opt-in: only an explicit `true` permits a proactive send. Raw Firestore docs
 * that predate consent being recorded have no field at all, and those must read
 * as disabled — the whole point of the gate is that silence is not permission.
 *
 * Note yup's `.default(false)` applies to parsed objects, not the raw snapshot
 * data the functions read, which is why this helper exists rather than callers
 * testing the field. A direct `=== false` check is the specific bug to avoid:
 * it treats absent as permitted and reopens the hole.
 *
 * Takes a loose shape so callers can pass raw snapshot data without casting.
 */
export function isWhatsappEnabled(
  user: Pick<UserData, "whatsappEnabled"> | Record<string, any> | undefined | null,
): boolean {
  return user?.whatsappEnabled === true;
}
