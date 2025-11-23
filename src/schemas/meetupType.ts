import * as yup from "yup";

/**
 * Canonical meetup type values
 * - "inPerson": Physical meetup at a specific location
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

/**
 * Yup schema for walk-level meetup type flags
 * Walk can support both in-person and remote participants
 */
export const walkMeetupTypeSchema = yup.object({
  inPerson: yup.boolean().required(),
  remote: yup.boolean().required(),
});

export type WalkMeetupType = yup.InferType<typeof walkMeetupTypeSchema>;
