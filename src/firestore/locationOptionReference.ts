/**
 * Firestore reference helpers for locationOptions subcollection
 *
 * These utilities provide type-safe access to the locationOptions subcollection
 * and should be used instead of accessing walk.locationOptions array.
 */

/**
 * Get the path to a walk's locationOptions subcollection
 * @param walkId - The walk document ID
 * @returns Firestore collection path string
 */
export function getLocationOptionsCollectionPath(walkId: string): string {
  return `walks/${walkId}/locationOptions`;
}

/**
 * Get the path to a specific locationOption document
 * @param walkId - The walk document ID
 * @param locationOptionId - The locationOption document ID
 * @returns Firestore document path string
 */
export function getLocationOptionDocPath(
  walkId: string,
  locationOptionId: string
): string {
  return `walks/${walkId}/locationOptions/${locationOptionId}`;
}

/**
 * Helper to sort location options by their index field
 * @param options - Array of location options with index field
 * @returns Sorted array
 */
export function sortLocationOptionsByIndex<T extends { index: number }>(
  options: T[]
): T[] {
  return [...options].sort((a, b) => a.index - b.index);
}
