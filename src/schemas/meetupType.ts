import * as yup from "yup";

/**
 * Canonical meetup type values
 * - "inPerson": Physical group at a specific location
 * - "remote": Virtual/remote participation from participant's own location
 */
export const MEETUP_TYPES = ["inPerson", "remote"] as const;

export type MeetupType = (typeof MEETUP_TYPES)[number];

/**
 * Yup schema for a single meetup type value
 * Used for participants and location options
 * Required for participants to ensure proper location option handling
 */
export const meetupTypeSchema = yup
  .mixed<MeetupType>()
  .oneOf(MEETUP_TYPES)
  .required("meetupType is required for participants");
