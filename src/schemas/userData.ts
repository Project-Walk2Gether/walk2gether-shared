import { keyBy, reduce } from "lodash";
import * as yup from "yup";
import { locationSchema } from "./location";
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
    {} as Record<string, yup.BooleanSchema>
  )
);

export const userDataSchema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  lastActiveAt: timestampSchema,
  tourDismissedAt: timestampSchema,
  location: locationSchema.optional().nullable(),
  profilePicUrl: yup.string().url().optional(),
  linkedInProfileUrl: yup.string().url().optional(),
  friendInvitationCode: yup.string(),
  expoPushToken: yup.string().nullable(),
  deviceInfo: yup.mixed(),
  aboutMe: yup.string().optional(),
  introduction: yup.string().optional(),
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
  // User activity tracking
  hasCreatedNeighborhoodWalk: yup.boolean().default(false),
  walkCount: yup.number().default(0),
});

export type UserData = yup.InferType<typeof userDataSchema>;
