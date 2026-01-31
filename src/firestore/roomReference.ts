/**
 * Firestore reference helpers for rooms subcollection
 *
 * These utilities provide type-safe access to the rooms subcollection.
 */

/**
 * Get the path to a walk's rooms subcollection
 * @param walkId - The walk document ID
 * @returns Firestore collection path string
 */
export function getRoomsCollectionPath(walkId: string): string {
  return `walks/${walkId}/rooms`;
}

/**
 * Get the path to a specific room document
 * @param walkId - The walk document ID
 * @param roomId - The room document ID
 * @returns Firestore document path string
 */
export function getRoomDocPath(walkId: string, roomId: string): string {
  return `walks/${walkId}/rooms/${roomId}`;
}
