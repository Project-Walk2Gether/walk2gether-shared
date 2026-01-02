import { BaseParticipant, Location, LocationOption, Walk } from "../schemas";

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
  walk: WalkWithLocationOptions
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
  locationOptions: LocationOption[]
): Location | null {
  const chosenId = participant.chosenLocationOptionId;
  if (chosenId) {
    const chosenOption = locationOptions.find(
      (opt) => (opt as any).id === chosenId
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
  locationOptions: LocationOption[]
): Location | null {
  // Get first participant's chosen location
  const participants = Object.values(walk.participantsById || {});
  if (participants.length > 0) {
    const firstParticipant = participants[0];
    return getChosenLocationForParticipant(
      walk,
      firstParticipant,
      locationOptions
    );
  }
  // Fallback to first location option's currentLocation
  return locationOptions?.[0]?.currentLocation ?? null;
}

/**
 * Check if a walk has started by checking if any location option has startedAt set.
 *
 * NOTE: locationOptions must be fetched from the subcollection and passed as a parameter.
 *
 * @param walk The walk to check
 * @param locationOptions The location options from the subcollection
 * @returns true if any location option has started, false otherwise
 */
export function hasWalkStarted(
  walk: Walk,
  locationOptions: LocationOption[]
): boolean {
  return locationOptions?.some((option) => option.startedAt) ?? false;
}

/**
 * Check if a walk has ended based on its location options
 * A walk is considered ended when all its location options have passed their scheduled end time
 *
 * @param walk The walk to check
 * @param locationOptions The location options from the subcollection
 * @returns true if all location options have ended, false otherwise
 */
export function hasWalkEnded(
  walk: Walk,
  locationOptions: LocationOption[]
): boolean {
  const now = new Date();
  return (
    (locationOptions &&
      locationOptions.length > 0 &&
      locationOptions.every((option) => {
        if (!option.endTime) return false;
        // Handle both Firestore Timestamp and Date objects
        const endTimeDate =
          typeof (option.endTime as any).toDate === "function"
            ? (option.endTime as any).toDate()
            : option.endTime;
        return endTimeDate <= now;
      })) ??
    false
  );
}
