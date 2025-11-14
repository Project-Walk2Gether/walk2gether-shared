import { LocationOption } from "../schemas/locationOption";
import { Participant } from "../schemas/participant";

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
    
    const distance = calculateDistance(latitude, longitude, optionLat, optionLon);
    return distance <= thresholdKm;
  });
}

/**
 * Generate a location option from a participant's home location
 */
export function createLocationOptionFromParticipant(
  participant: Participant,
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
    isConfirmed: false,
    currentLocation: {
      latitude,
      longitude,
      displayName: `${displayName}'s Location`,
      city: "Remote Location",
    },
  };
}

/**
 * Process participants and return new location options that should be added
 * for remote participants who don't have a nearby location yet.
 * 
 * @param participants - Record of participant ID to participant data
 * @param existingLocationOptions - Current location options on the walk
 * @returns Array of new location options to add
 */
export function getLocationOptionsForRemoteParticipants(
  participants: Record<string, Participant>,
  existingLocationOptions: LocationOption[] = []
): LocationOption[] {
  const newLocationOptions: LocationOption[] = [];

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

    const { latitude, longitude } = participant.homeLocation;

    // Check if there's already a location within 1km
    if (hasNearbyLocation(existingLocationOptions, latitude, longitude)) {
      console.log(
        `[remoteParticipantLocations] Location already exists near ${participantId}'s home`
      );
      continue;
    }

    // Also check against locations we're about to add
    if (hasNearbyLocation(newLocationOptions, latitude, longitude)) {
      console.log(
        `[remoteParticipantLocations] Location already queued near ${participantId}'s home`
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
