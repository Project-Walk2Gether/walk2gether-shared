/**
 * Returns a consistent, canonical friendship ID from two user IDs
 * by sorting them lexicographically and joining with an underscore.
 * This ensures the same ID regardless of parameter order.
 *
 * @param uid1 First user ID
 * @param uid2 Second user ID
 * @returns Canonical friendship ID in the format "uidA_uidB"
 */
export const getFriendshipId = (uid1: string, uid2: string): string => {
  return [uid1, uid2].sort().join("_");
};
