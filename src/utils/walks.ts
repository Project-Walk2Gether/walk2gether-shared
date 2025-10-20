import { Location, Walk } from "../schemas";

/**
 * Resolve the chosen location for a walk.
 * - If walk.chosenLocationIndex is a valid index, returns that option's location
 * - Otherwise falls back to walk.currentLocation if present
 * - Otherwise returns null
 */
export function getChosenLocationForWalk(walk: Walk): Location | null {
  const idx = walk.chosenLocationIndex;
  if (
    typeof idx === "number" &&
    Array.isArray(walk.locationOptions) &&
    walk.locationOptions[idx]?.location
  ) {
    return walk.locationOptions[idx].location;
  }
  return walk.currentLocation ?? null;
}
