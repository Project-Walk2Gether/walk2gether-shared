import { Participant } from "../schemas/participant";
import { UserData } from "../schemas/userData";

export interface ParticipantFromUserOptions {
  user: Partial<UserData> & {
    id: string;
    name?: string;
    profilePicUrl?: string;
  };
  sourceType: "requested" | "invited" | "walk-creator";
  status?: "pending" | "on-the-way" | "arrived";
  acceptedAt?: any | null; // Can be Timestamp or Date
  navigationMethod?: "driving" | "walking";
  meetupType?: "inPerson" | "remote";
}

/**
 * Creates a Participant object from UserData
 * This ensures consistent participant creation across the app
 */
export function participantFromUser(
  options: ParticipantFromUserOptions
): Omit<Participant, "createdAt" | "updatedAt"> {
  const {
    user,
    sourceType,
    status = "pending",
    acceptedAt = null,
    navigationMethod = "walking",
    meetupType = "inPerson", // Default to inPerson if not specified
  } = options;

  // Get timezone from user data or use browser/system default
  const timezone =
    user.timezone ||
    (typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC");

  return {
    userUid: user.id,
    displayName: user.name || "Anonymous",
    photoURL: user.profilePicUrl || null,
    introduction: user.introduction,
    timezone,
    availability: (user as any).availability,
    status,
    sourceType,
    notifiedEstimatedArrivalTime: null,
    acceptedAt: acceptedAt || null,
    interestExpressedAt: null,
    deniedAt: null,
    cancelledAt: null,
    statusUpdatedAt: null,
    suggestedDepartureTime: null,
    suggestedDepartureNotificationSentAt: null,
    hiddenAt: null,
    chosenLocationOptionId: undefined,
    isLocationShared: true,
    eta: null,
    lastLocation: undefined,
    homeLocation: user.location ?? null,
    route: null,
    navigationMethod,
    meetupType,
  } as Omit<Participant, "createdAt" | "updatedAt">;
}
