import { Location, Walk, BaseParticipant } from "../schemas";

/**
 * Resolve the chosen location for a specific participant in a walk.
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
