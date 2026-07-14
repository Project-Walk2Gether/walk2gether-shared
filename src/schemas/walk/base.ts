import * as yup from "yup";
import { objectOf } from "../../utils/objectOf";
import { meetupTypeSchema } from "../meetupType";
import { baseParticipantSchema } from "../participant";
import { walkRecentMessageSchema } from "./recentMessage";
import { timestampSchema } from "../utils/timestamp";

export const recurrenceUnits = ["weeks", "months"] as const;
export type RecurrenceUnit = (typeof recurrenceUnits)[number];

export const recurrenceSchema = yup
  .object({
    unit: yup
      .string()
      .oneOf([...recurrenceUnits])
      .required(),
    interval: yup.number().required().positive().integer().min(1).max(12),
  })
  .optional()
  .nullable()
  .default(null);

export type Recurrence = yup.InferType<typeof recurrenceSchema>;

/**
 * A concrete time slot offered to the invitee when the walk is created in
 * "availability" scheduling mode. Times are absolute UTC instants; the invitee
 * sees them rendered in their own timezone and picks one to set the walk time.
 */
export const proposedSlotSchema = yup.object({
  id: yup.string().required(),
  startUtc: timestampSchema.required(),
  endUtc: timestampSchema.required(),
});

export type ProposedSlot = yup.InferType<typeof proposedSlotSchema>;

export const walkBaseSchema = yup.object({
  id: yup.string(),
  invitationCode: yup.string().optional(),
  // Optional/nullable: an "availability" walk has NO date until the invitee
  // picks a slot (the chooseWalkSlot callable then sets it). For "proposed"
  // (fixed-time) walks the date is set at creation. Readers must treat date as
  // possibly absent.
  date: timestampSchema.optional().nullable(),
  // endTime / endTimeWithBuffer stay required: they bound the offered window
  // (for availability walks, the latest offered slot) and back the home query's
  // `endTime > now` filter, so the walk surfaces and expires correctly.
  endTime: timestampSchema.required(),
  endTimeWithBuffer: timestampSchema.required(),
  status: yup.string().oneOf(["proposed", "confirmed", "expired"]).required(),
  // How the walk time is decided:
  // - "proposed": creator picks a fixed time (the existing flow). date is final.
  // - "availability": creator offers proposedSlots; status stays "proposed" with
  //   no date until the invitee picks one (via the chooseWalkSlot callable),
  //   which confirms the walk and sets its date.
  // Optional for back-compat: existing/legacy walks with no schedulingMode are
  // treated as "proposed" (a fixed time) by readers. No default() so the
  // inferred type stays optional and existing construction sites don't break.
  schedulingMode: yup.string().oneOf(["proposed", "availability"]).optional(),
  proposedSlots: yup.array().of(proposedSlotSchema).optional(),
  // The offer as originally created, immutable. proposedSlots holds the
  // EFFECTIVE offer: original minus the creator's current calendar-busy times,
  // recomputed on every calendar sync (see adjustProposedAvailabilityWalks in
  // functions). A busy block is a temporary, dated override — if the calendar
  // event moves or is deleted, the slot is restored from here. The creator's
  // recurring weekly availability (userData.availability) is never modified.
  originalProposedSlots: yup.array().of(proposedSlotSchema).optional(),
  // When the creator last nudged the invitee about a pending availability
  // invitation (sends a friendship-chat message). Gates the walk card's Nudge
  // button to one nudge per cooldown window.
  inviteNudgeSentAt: timestampSchema.optional().nullable(),
  // Which channel the walk was created through. WhatsApp-created walks (via the
  // agent) get WhatsApp lifecycle updates (invites, responses); in-app walks do
  // not. Optional for back-compat: legacy walks with no channel are treated as
  // NOT WhatsApp, so they won't trigger WhatsApp outreach.
  channel: yup.string().oneOf(["app", "whatsapp"]).optional(),
  durationMinutes: yup.number().required().positive().integer(),
  organizerName: yup.string().required(),
  createdByUid: yup.string().required(),
  allowLocationSuggestions: yup.boolean().optional().default(true),
  totalDistanceMiles: yup.number(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  // When the walk actually started and ended (set at runtime)
  startedAt: timestampSchema.nullable(),
  endedAt: timestampSchema.nullable(),
  // Set when a friends walk transitions to having zero connected
  // participants before its scheduled end time. Cleared if anyone
  // reconnects. friendsWalkDisconnectCheckTask uses this to end the walk
  // once it's been true for a grace period, without ending prematurely on a
  // brief disconnect (e.g. a dropped call that gets rejoined).
  allDisconnectedSince: timestampSchema.nullable().optional(),
  // Set once friendship step counts have been aggregated for this walk, so the
  // walk-end aggregation runs exactly once. See aggregateFriendshipSteps.
  stepsAggregatedAt: timestampSchema.nullable(),
  // Per-user walk-total step counts, keyed by uid, denormalized from each
  // participant's telemetry doc at walk-end aggregation. Lets consumers (e.g.
  // the Past walks summary) sum a user's steps across walks without an N-read
  // fan-out into the telemetry subcollections. Written by aggregateSharedSteps.
  stepsByUid: objectOf(yup.number().required()).optional(),
  // Whether in-person or remote, or both
  meetupType: meetupTypeSchema.required(),
  visibility: yup.string().oneOf(["public", "private"]).required(),
  participantsById: objectOf(baseParticipantSchema).optional(),
  recentMessagesByUserId: objectOf(walkRecentMessageSchema).optional(),
  participantUids: yup.array().of(yup.string().required()),
  groupId: yup.string().optional(),
  ownerIsInitiallyAtLocation: yup.boolean().optional().default(undefined),
  allowParticipantInvites: yup.boolean().optional().default(false),
  // URL of the generated selfie collage image for this walk
  collageUrl: yup.string().url().nullable().default(null),
  dayBeforeReminderSentAt: timestampSchema.optional().nullable(),
  // Stamped once the WhatsApp "can you make it?" confirmation has been sent to
  // this auto-matched walk's members. Firestore triggers are at-least-once, and
  // each send writes a new aiMessages doc, so without this a re-fire would
  // re-message everyone.
  groupConfirmationSentAt: timestampSchema.optional().nullable(),
  recurrence: recurrenceSchema,
  recurrenceGroupId: yup.string().optional().nullable().default(null),
  nextWalkId: yup.string().optional().nullable().default(null),
  // True for walks created by the automatic weekly group-matching job. Used to
  // find/deduplicate auto-scheduled walks on re-runs (so re-running matching
  // doesn't create duplicates) and to distinguish them from user-created walks.
  // Optional (not defaulted) so legacy/user-created walk literals don't have to
  // set it; readers treat a missing value as false (=== true).
  autoMatched: yup.boolean().optional(),
  // Optional per-walk override for the end-of-walk Chester debrief questions.
  // When unset, the global default (config/feedback) is used.
  feedbackQuestions: yup.array().of(yup.string().required()).optional(),
});

// Export canonical types
export type WalkBase = yup.InferType<typeof walkBaseSchema>;
