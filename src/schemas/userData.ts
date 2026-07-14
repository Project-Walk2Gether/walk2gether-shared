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
  expoPushToken: yup.string().nullable(),
  expoPushTokenSetAt: timestampSchema,
  appVersion: yup.string().optional(),
  appVersionSetAt: timestampSchema,
  deviceInfo: yup.mixed(),
  aboutMe: yup.string().optional(),
  // Whether the user's "about me" should be used when introducing them in
  // group walks. Opt-in: defaults to false unless the user turns it on.
  includeAboutMeInIntroductions: yup.boolean().default(false),
  availability: availabilitySchema.optional().default(undefined),
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
