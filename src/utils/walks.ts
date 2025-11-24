import { BaseParticipant, Location, Walk } from "../schemas";

/**
 * Resolve the chosen location for a specific participant in a walk.
 *
 * NOTE: This function expects walk.locationOptions to be populated.
 * When using subcollections, fetch locationOptions first and pass a walk object with the array populated.
 *
 * - If participant.chosenLocationIndex is a valid index, returns that option's location
 * - Otherwise falls back to first locationOption's currentLocation if present
 * - Otherwise returns null
 */
export function getChosenLocationForParticipant(
  walk: Walk,
  participant: BaseParticipant
): Location | null {
  const idx = (participant as any).chosenLocationIndex;
  if (
    typeof idx === "number" &&
    Array.isArray(walk.locationOptions) &&
    walk.locationOptions[idx]?.location
  ) {
    return walk.locationOptions[idx].location;
  }
  // Fallback to first location option's currentLocation
  return walk.locationOptions?.[0]?.currentLocation ?? null;
}

/**
 * For non-remote walks, get the shared location that all participants use.
 * Returns the first participant's chosen location, or first locationOption's currentLocation as fallback.
 *
 * NOTE: This function expects walk.locationOptions to be populated.
 * When using subcollections, fetch locationOptions first and pass a walk object with the array populated.
 */
export function getSharedLocationForWalk(walk: Walk): Location | null {
  // Get first participant's chosen location
  const participants = Object.values(walk.participantsById || {});
  if (participants.length > 0) {
    const firstParticipant = participants[0];
    return getChosenLocationForParticipant(walk, firstParticipant);
  }
  // Fallback to first location option's currentLocation
  return walk.locationOptions?.[0]?.currentLocation ?? null;
}

/**
 * Check if a walk has started by checking if any location option has startedAt set.
 *
 * NOTE: This function expects walk.locationOptions to be populated.
 * When using subcollections, fetch locationOptions first and pass a walk object with the array populated.
 *
 * @param walk The walk to check
 * @returns true if any location option has started, false otherwise
 */
export function hasWalkStarted(walk: Walk): boolean {
  return walk.locationOptions?.some((option) => option.startedAt) ?? false;
}

/**
 * Check if a walk has ended by checking if all location options have endedAt set.
 *
 * NOTE: This function expects walk.locationOptions to be populated.
 * When using subcollections, fetch locationOptions first and pass a walk object with the array populated.
 *
 * @param walk The walk to check
 * @returns true if all location options have ended, false otherwise
 */
export function hasWalkEnded(walk: Walk): boolean {
  return (
    (walk.locationOptions &&
      walk.locationOptions.length > 0 &&
      walk.locationOptions.every((option) => option.endedAt)) ??
    false
  );
}
