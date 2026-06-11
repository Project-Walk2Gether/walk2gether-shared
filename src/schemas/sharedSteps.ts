import * as yup from "yup";
import { objectOf } from "../utils/objectOf";
import { Timestamp } from "./utils/firebase";
import { timestampSchema } from "./utils/timestamp";

/**
 * Steps a pair of users have walked together, recorded per walk. Stored at:
 *   sharedSteps/{pairId}
 * where pairId is the canonical sorted-uid id (same format as friendship ids,
 * see getFriendshipId). Keyed by pair — NOT by friendship — so counts accrue
 * between users who aren't (yet) friends; if they befriend later, the history
 * is already there.
 *
 * Entries are keyed by walkId, which makes the walk-end aggregation idempotent
 * by construction: re-running a walk overwrites its own entry rather than
 * double-counting. Consumers sum entries client-side (see getSharedStepsTotal).
 *
 * Written only by the walk-end aggregation (aggregateSharedSteps cloud
 * function); clients have read-only access.
 */
export const sharedStepsWalkEntrySchema = yup.object({
  // When the walk took place (the walk's scheduled date).
  date: timestampSchema,
  // Each member's own steps for this walk while sharing a room with the other
  // (average steps per room they were in, credited per shared room).
  stepsWalkedByUid: objectOf(yup.number().required()),
});

export const sharedStepsSchema = yup.object({
  // The two users in this pair, sorted lexicographically (matches the doc id).
  uids: yup.array().of(yup.string().required()).required(),
  // One entry per walk where the pair shared a room, keyed by walkId.
  walks: objectOf(sharedStepsWalkEntrySchema),
  updatedAt: timestampSchema,
});

// Explicit types: objectOf() is a yup.lazy, which defeats InferType.
export interface SharedStepsWalkEntry {
  date: Timestamp;
  stepsWalkedByUid: Record<string, number>;
}

export interface SharedSteps {
  uids: string[];
  walks: Record<string, SharedStepsWalkEntry>;
  updatedAt?: Timestamp;
}
