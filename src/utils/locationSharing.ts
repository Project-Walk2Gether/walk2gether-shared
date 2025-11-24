import { LocationOption } from "../schemas/locationOption";
import { BaseParticipant } from "../schemas/participant";

/**
 * Returns true if all participants have opted in to sharing their location
 * with other participants.
 *
 * By design, participants with an undefined flag are treated as opted in
 * (for backwards compatibility with existing data). Only an explicit
 * `false` value is considered an opt-out.
 */
export function allParticipantsShareLocation(
  participantsById?: Record<string, BaseParticipant> | null
): boolean {
  if (!participantsById) return false;

  const participants = Object.values(participantsById);
  if (participants.length === 0) return false;

  return participants.every(
    (participant) => participant.isLocationShared !== false
  );
}

/**
 * Filters location options based on participant location-sharing preferences.
 *
 * The current rule is global: location information should only be shown if
 * **all** participants have `isLocationShared === true` (or undefined).
 *
 * This helper implements that rule by returning the original array when
 * everyone has opted in, or an empty array when at least one participant
 * has opted out.
 *
 * NOTE: Pass the locationOptions array fetched from the subcollection.
 */
export function filterLocationOptionsByLocationSharing(
  locationOptions: LocationOption[] | undefined,
  participantsById?: Record<string, BaseParticipant> | null
): LocationOption[] {
  if (!locationOptions || locationOptions.length === 0) return [];

  if (!allParticipantsShareLocation(participantsById)) {
    return [];
  }

  return locationOptions;
}
