import { getFriendshipId } from "../utils/friendship";

/**
 * Firestore reference helpers for shared-steps pair documents.
 *
 * Shared steps are stored one document per user pair at:
 *   sharedSteps/{pairId}
 * keyed by the canonical sorted-uid pair id (same format as friendship ids),
 * independent of whether a friendship exists between the pair.
 */

/**
 * Get the path to the shared-steps document for a pair of users.
 * Argument order doesn't matter — the id is canonical.
 */
export function getSharedStepsDocPath(uid1: string, uid2: string): string {
  return `sharedSteps/${getFriendshipId(uid1, uid2)}`;
}
