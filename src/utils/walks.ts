import { BaseParticipant, Location, LocationOption, Walk } from "../schemas";

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
 * Check if a walk has ended by checking if all location options have endedAt set.
 *
 * NOTE: locationOptions must be fetched from the subcollection and passed as a parameter.
 *
 * @param walk The walk to check
 * @param locationOptions The location options from the subcollection
 * @returns true if all location options have ended, false otherwise
 */
export function hasWalkEnded(
  walk: Walk,
  locationOptions: LocationOption[]
): boolean {
  return (
    (locationOptions &&
      locationOptions.length > 0 &&
      locationOptions.every((option) => option.endedAt)) ??
    false
  );
}
