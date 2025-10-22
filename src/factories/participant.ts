import { Participant } from "../schemas/participant";
import { UserData } from "../schemas/userData";

export interface ParticipantFromUserOptions {
  user: Partial<UserData> & { id: string; name?: string; profilePicUrl?: string; location?: { latitude: number; longitude: number } };
  sourceType: "requested" | "invited" | "walk-creator";
  status?: "pending" | "on-the-way" | "arrived";
  acceptedAt?: any | null; // Can be Timestamp or Date
  navigationMethod?: "driving" | "walking";
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
  } = options;

  return {
    userUid: user.id,
    displayName: user.name || "Anonymous",
    photoURL: user.profilePicUrl || null,
    introduction: user.introduction,
    timezone: user.timezone,
    availability: (user as any).availability,
    status,
    sourceType,
    notifiedEstimatedArrivalTime: null,
    acceptedAt: acceptedAt || null,
    interestExpressedAt: null,
    deniedAt: null,
    cancelledAt: null,
    statusUpdatedAt: undefined,
    suggestedDepartureTime: null,
    suggestedDepartureNotificationSentAt: null,
    hiddenAt: null,
    chosenLocationIndex: undefined,
    lastLocation: undefined,
    homeLocation: user.location
      ? {
          latitude: user.location.latitude,
          longitude: user.location.longitude,
        }
      : undefined,
    route: null,
    navigationMethod,
  } as Omit<Participant, "createdAt" | "updatedAt">;
}
