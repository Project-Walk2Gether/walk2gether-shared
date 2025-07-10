import { Sync } from "factory.ts";
import { UserData } from "../schemas/userData";

/**
 * Factory for creating UserData objects for testing
 *
 * This factory creates data that matches the UserData type from the userData schema
 */
export const userDataFactory = Sync.makeFactory<UserData>({
  name: "Michael Moonboots",
  createdAt: { toDate: () => new Date() } as any, // Simulating Firestore Timestamp
  updatedAt: { toDate: () => new Date() } as any,
  lastActiveAt: { toDate: () => new Date() } as any,
  tourDismissedAt: { toDate: () => new Date() } as any,
  location: null,
  profilePicUrl: "",
  friendInvitationCode: "",
  expoPushToken: null,
  deviceInfo: {},
  distanceUnit: "mi",
  aboutMe: "",
  introduction: "",
  phoneNumber: "",
  notificationPreferences: {
    friendETA: true,
    newNeighborhoodWalks: true,
    invitedToFriendWalks: true,
  },
  notificationsPermissionsSetAt: { toDate: () => new Date() } as any,
  currentQuoteIndex: 0,
  neighborhoodWalksHowItWorksDontShowAgain: false,
  hasCreatedNeighborhoodWalk: false,
  walkCount: 0,
});

/**
 * Creates a user data object with Firebase server timestamps
 * This is useful when you need to create data that will be stored in Firestore
 *
 * @param admin Firebase Admin SDK instance
 * @param overrides Optional overrides for the user data
 * @returns UserData object with server timestamps
 */
export const createUserDataWithServerTimestamps = (
  admin: any,
  overrides: Partial<UserData> = {}
): UserData => {
  const serverTimestamp = admin.firestore.FieldValue.serverTimestamp();

  return userDataFactory.build({
    createdAt: serverTimestamp,
    updatedAt: serverTimestamp,
    lastActiveAt: serverTimestamp,
    tourDismissedAt: serverTimestamp,
    notificationsPermissionsSetAt: serverTimestamp,
    ...overrides,
  });
};
