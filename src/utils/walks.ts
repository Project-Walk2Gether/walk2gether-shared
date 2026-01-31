import {
  BaseParticipant,
  Location,
  LocationOption,
  Room,
  Walk,
} from "../schemas";

// Extended walk type that includes locationOptions array (for API responses)
type WalkWithLocationOptions = Walk & {
  locationOptions?: LocationOption[];
};

/**
 * Get the primary location for a walk.
 * For walks with locationOptions embedded in the response, returns the first location option's location.
 * This is useful for displaying walk location in web views where locationOptions are included in the API response.
 *
 * @param walk The walk object, potentially with locationOptions array included
 * @returns The first location option's location, or null if not available
 */
export function getChosenLocationForWalk(
  walk: WalkWithLocationOptions,
): Location | null {
  const locationOptions = walk.locationOptions;
  if (!locationOptions || locationOptions.length === 0) {
    return null;
  }

  // Return the first location option's location
  const firstOption = locationOptions[0];
  return firstOption?.location ?? firstOption?.currentLocation ?? null;
}

/**
 * Resolve the chosen location for a specific participant in a walk.
 *
 * NOTE: locationOptions must be fetched from the subcollection and passed as a parameter.
 *
 * - If participant.chosenLocationOptionId matches an option, returns that option's location
 * - Otherwise falls back to first locationOption's currentLocation if present
 * - Otherwise returns null
 */
export function getChosenLocationForParticipant(
  walk: Walk,
  participant: BaseParticipant,
  locationOptions: LocationOption[],
): Location | null {
  const chosenId = participant.chosenLocationOptionId;
  if (chosenId) {
    const chosenOption = locationOptions.find(
      (opt) => (opt as any).id === chosenId,
    );
    if (chosenOption?.location) {
      return chosenOption.location;
    }
  }
  // Fallback to first location option's currentLocation
  return locationOptions?.[0]?.currentLocation ?? null;
}

/**
 * For non-remote walks, get the shared location that all participants use.
 * Returns the first participant's chosen location, or first locationOption's currentLocation as fallback.
 *
 * NOTE: locationOptions must be fetched from the subcollection and passed as a parameter.
 */
export function getSharedLocationForWalk(
  walk: Walk,
  locationOptions: LocationOption[],
): Location | null {
  // Get first participant's chosen location
  const participants = Object.values(walk.participantsById || {});
  if (participants.length > 0) {
    const firstParticipant = participants[0];
    return getChosenLocationForParticipant(
      walk,
      firstParticipant,
      locationOptions,
    );
  }
  // Fallback to first location option's currentLocation
  return locationOptions?.[0]?.currentLocation ?? null;
}

/**
 * Check if a walk has started by checking if any room has startedAt set.
 *
 * @param rooms The rooms from the subcollection
 * @returns true if any room has started, false otherwise
 */
export function hasWalkStarted(rooms: Room[]): boolean {
  return rooms?.some((room) => room.startedAt != null) ?? false;
}

/**
 * Check if a walk has ended based on its rooms.
 * A walk is considered ended when all its rooms have passed their shouldEndAt time.
 *
 * @param rooms The rooms from the subcollection
 * @returns true if all rooms have ended, false otherwise
 */
export function hasWalkEnded(rooms: Room[]): boolean {
  if (!rooms || rooms.length === 0) return false;

  const now = new Date();
  return rooms.every((room) => {
    if (!room.shouldEndAt) return false;
    // Handle both Firestore Timestamp and Date objects
    const endTimeDate =
      typeof (room.shouldEndAt as unknown as { toDate: () => Date }).toDate ===
      "function"
        ? (room.shouldEndAt as unknown as { toDate: () => Date }).toDate()
        : room.shouldEndAt;
    return endTimeDate <= now;
  });
}
