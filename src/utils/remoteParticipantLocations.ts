import { LocationOption } from "../schemas/locationOption";
import { BaseParticipant } from "../schemas/participant";

/**
 * Calculate distance between two coordinates in kilometers using Haversine formula
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Check if there's already a location within 1km of the given coordinates
 */
function hasNearbyLocation(
  locationOptions: LocationOption[],
  latitude: number,
  longitude: number,
  thresholdKm: number = 1
): boolean {
  return locationOptions.some((option) => {
    const optionLat = option.location.latitude;
    const optionLon = option.location.longitude;
    if (optionLat === undefined || optionLon === undefined) return false;

    const distance = calculateDistance(
      latitude,
      longitude,
      optionLat,
      optionLon
    );
    return distance <= thresholdKm;
  });
}

/**
 * Generate a location option from a participant's home location
 */
export function createLocationOptionFromParticipant(
  participant: BaseParticipant,
  participantId: string
): LocationOption | null {
  if (!participant.homeLocation) {
    return null;
  }

  const { latitude, longitude } = participant.homeLocation;
  const displayName = participant.displayName || "Unknown";

  return {
    location: {
      latitude,
      longitude,
      name: `${displayName}'s Location`,
      displayName: `${displayName}'s Location`,
      city: "Remote Location", // Generic city name for remote locations
    },
    votes: {},
    proposedBy: participantId,
    proposedAt: new Date(),
    isConfirmed: true, // Remote participants' locations are auto-confirmed (no voting needed)
    meetupType: "remote", // Mark this as a remote location option
    currentLocation: {
      latitude,
      longitude,
      displayName: `${displayName}'s Location`,
      city: "Remote Location",
    },
    startedAt: null,
    endTime: null, // Scheduled end time - walk is considered ended after this time
    route: null, // Route will be populated by the participant's tracked route
    destinations: [], // No destinations by default for remote participant locations
  };
}

/**
 * Process participants and return new location options that should be added
 * for remote participants.
 *
 * For simplicity, each remote participant gets their own location option.
 * This represents their home city/area where they'll be walking from.
 *
 * NOTE: When using subcollections, the returned LocationOption objects should be written
 * to the locationOptions subcollection with proper document IDs, walkId, index, and timestamps.
 * See LocationOptionDocument schema for the full document structure.
 *
 * @param participants - Record of participant ID to participant data
 * @param existingLocationOptions - Array of existing location options (fetch from subcollection)
 * @returns Array of new location options to add to the subcollection
 */
export function getLocationOptionsForRemoteParticipants(
  participants: Record<string, BaseParticipant>,
  existingLocationOptions: LocationOption[] = []
): LocationOption[] {
  const newLocationOptions: LocationOption[] = [];

  // Get all existing location options that were created for remote participants
  const existingRemoteLocationsByParticipant = new Map<
    string,
    LocationOption
  >();
  existingLocationOptions.forEach((option) => {
    if (option.proposedBy) {
      existingRemoteLocationsByParticipant.set(option.proposedBy, option);
    }
  });

  for (const [participantId, participant] of Object.entries(participants)) {
    // Skip if not a remote participant
    if (participant.meetupType !== "remote") {
      continue;
    }

    // Skip if participant has no home location
    if (!participant.homeLocation) {
      console.warn(
        `[remoteParticipantLocations] Remote participant ${participantId} has no homeLocation`
      );
      continue;
    }

    // Skip if this participant already has a location option
    if (existingRemoteLocationsByParticipant.has(participantId)) {
      console.log(
        `[remoteParticipantLocations] Participant ${participantId} already has a location option`
      );
      continue;
    }

    // Create a new location option for this participant
    const locationOption = createLocationOptionFromParticipant(
      participant,
      participantId
    );

    if (locationOption) {
      newLocationOptions.push(locationOption);
      console.log(
        `[remoteParticipantLocations] Added location for remote participant ${participantId}`
      );
    }
  }

  return newLocationOptions;
}
