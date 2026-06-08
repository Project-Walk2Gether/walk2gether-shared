import {
  BaseParticipant,
  Location,
  LocationOption,
  Room,
  Walk,
} from "../schemas";

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
  walk: WalkWithLocationOptions,
): Location | null {
  const locationOptions = walk.locationOptions;
  if (!locationOptions || locationOptions.length === 0) {
    return null;
  }

  // Return the first location option's location
  const firstOption = locationOptions[0];
  return firstOption?.location ?? null;
}

/**
 * Resolve the chosen location for a specific participant in a walk.
 *
 * NOTE: locationOptions must be fetched from the subcollection and passed as a parameter.
 *
 * - If participant.chosenLocationOptionId matches an option, returns that option's location
 * - Otherwise falls back to the first locationOption's stable location
 * - Otherwise returns null
 */
export function getChosenLocationForParticipant(
  walk: Walk,
  participant: BaseParticipant,
  locationOptions: LocationOption[],
): Location | null {
  const chosenId = participant.chosenLocationOptionId;
  if (chosenId) {
    const chosenOption = locationOptions.find(
      (opt) => (opt as any).id === chosenId,
    );
    if (chosenOption?.location) {
      return chosenOption.location;
    }
  }
  return locationOptions?.[0]?.location ?? null;
}

/**
 * For non-remote walks, get the shared location that all participants use.
 * Returns the first participant's chosen location, or first locationOption's stable location as fallback.
 *
 * NOTE: locationOptions must be fetched from the subcollection and passed as a parameter.
 */
export function getSharedLocationForWalk(
  walk: Walk,
  locationOptions: LocationOption[],
): Location | null {
  // Get first participant's chosen location
  const participants = Object.values(walk.participantsById || {});
  if (participants.length > 0) {
    const firstParticipant = participants[0];
    return getChosenLocationForParticipant(
      walk,
      firstParticipant,
      locationOptions,
    );
  }
  return locationOptions?.[0]?.location ?? null;
}

/**
 * Check if a walk has started by checking if any room has startedAt set.
 *
 * @param rooms The rooms from the subcollection
 * @returns true if any room has started, false otherwise
 */
export function hasWalkStarted(rooms: Room[]): boolean {
  return rooms?.some((room) => room.startedAt != null) ?? false;
}

/**
 * Check if a walk has ended based on its rooms.
 * A walk is considered ended when all its rooms have passed their shouldEndAt time.
 *
 * @param rooms The rooms from the subcollection
 * @returns true if all rooms have ended, false otherwise
 */
export function hasWalkEnded(rooms: Room[]): boolean {
  if (!rooms || rooms.length === 0) return false;

  const now = new Date();
  return rooms.every((room) => {
    if (!room.shouldEndAt) return false;
    // Handle both Firestore Timestamp and Date objects
    const endTimeDate =
      typeof (room.shouldEndAt as unknown as { toDate: () => Date }).toDate ===
      "function"
        ? (room.shouldEndAt as unknown as { toDate: () => Date }).toDate()
        : room.shouldEndAt;
    return endTimeDate <= now;
  });
}

// --- Group walk round planning ---------------------------------------------
//
// A group walk is split into a series of pair "rounds" (you meet one partner
// per round, then rotate) followed by an optional "final room" where everyone
// gathers. We target a ~5 minute final room, but let it absorb whatever time
// doesn't divide evenly into the pair rounds — so the pair talking time need
// not be a round number (e.g. 8 or 13 minutes are valid options).

/** Minutes we aim to reserve for the final room before any mop-up. */
export const FINAL_ROOM_TARGET_MINUTES = 5;

/** Shortest pair talking time we'll ever offer. */
const MIN_PAIR_TALKING_MINUTES = 5;

/** Bounds on the number of partners an option may produce. */
const MIN_PARTNERS = 2;
const MAX_PARTNERS = 8;

function pairRoundBudget(
  durationMinutes: number,
  enableFinalRoom: boolean,
): number {
  return enableFinalRoom
    ? durationMinutes - FINAL_ROOM_TARGET_MINUTES
    : durationMinutes;
}

/**
 * Pair talking time options (in minutes) to offer for a group walk.
 *
 * Each option corresponds to a distinct number of partners. For a given
 * partner count the best pair time is the longest one that still fits within
 * the budget (this minimises the leftover mopped up by the final room). We then
 * thin the list to every other entry so the choices are meaningfully different
 * rather than one-minute-apart neighbours.
 *
 * e.g. a 30 min walk yields [5, 8] and a 45 min walk yields [5, 8, 13].
 */
export function getPairTalkingTimeOptions(
  durationMinutes: number,
  enableFinalRoom: boolean = true,
): number[] {
  const budget = pairRoundBudget(durationMinutes, enableFinalRoom);
  const maxPartners = Math.min(
    MAX_PARTNERS,
    Math.floor(budget / MIN_PAIR_TALKING_MINUTES),
  );

  if (maxPartners < MIN_PARTNERS) {
    return [
      Math.max(MIN_PAIR_TALKING_MINUTES, Math.floor(durationMinutes / 2)),
    ];
  }

  const pairTimes = new Set<number>();
  for (let partners = MIN_PARTNERS; partners <= maxPartners; partners++) {
    pairTimes.add(Math.floor(budget / partners));
  }

  const sorted = [...pairTimes].sort((a, b) => a - b);
  return sorted.filter((_, index) => index % 2 === 0);
}

export interface RoundPlan {
  /** Number of pair rounds (partners met) before the final room. */
  numPartners: number;
  /** Length of the final room in minutes (0 when disabled). */
  finalRoomMinutes: number;
}

/**
 * Work out how many partners a participant meets and how long the final room
 * runs, given a chosen pair talking time.
 *
 * With the final room enabled we reserve ~5 minutes for it and let it absorb
 * any remainder; with it disabled the whole duration is spent meeting partners.
 */
export function computeRoundPlan({
  durationMinutes,
  roundLengthMinutes,
  enableFinalRoom,
}: {
  durationMinutes: number;
  roundLengthMinutes: number;
  enableFinalRoom: boolean;
}): RoundPlan {
  if (roundLengthMinutes <= 0) {
    return { numPartners: 0, finalRoomMinutes: 0 };
  }

  const budget = pairRoundBudget(durationMinutes, enableFinalRoom);
  const numPartners = Math.floor(budget / roundLengthMinutes);

  if (!enableFinalRoom) {
    return { numPartners, finalRoomMinutes: 0 };
  }

  return {
    numPartners,
    finalRoomMinutes: durationMinutes - numPartners * roundLengthMinutes,
  };
}
