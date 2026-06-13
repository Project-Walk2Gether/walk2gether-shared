import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const roomAnnouncementKindSchema = yup
  .mixed<
    | "third_wheel_join"
    | "third_wheel_departure"
    | "admin"
    | "introduction"
    | "wrap_up"
    | "enjoy_walk"
  >()
  .oneOf([
    "third_wheel_join",
    "third_wheel_departure",
    "admin",
    "introduction",
    "wrap_up",
    "enjoy_walk",
  ])
  .required();

export const roomAnnouncementSoundSchema = yup
  .mixed<"default" | "bonus_chime" | "none">()
  .oneOf(["default", "bonus_chime", "none"])
  .required();

export const announcementStepTypeSchema = yup
  .mixed<"sound" | "speech">()
  .oneOf(["sound", "speech"])
  .required();

export const announcementStepSchema = yup.object({
  type: announcementStepTypeSchema,
  sound: yup
    .mixed<"default" | "bonus_chime">()
    .oneOf(["default", "bonus_chime"])
    .optional(),
  text: yup.string().optional(),
  audioUrl: yup.string().nullable().default(null),
  delayAfterMs: yup.number().optional(),
});

export const roomAnnouncementSchema = yup.object({
  id: yup.string(),
  kind: roomAnnouncementKindSchema,
  text: yup.string().required(),
  sound: roomAnnouncementSoundSchema,
  audioUrl: yup.string().nullable().default(null),
  steps: yup.array().of(announcementStepSchema).nullable().default(null),
  playAt: timestampSchema.required(),
  createdAt: timestampSchema.required(),
  processedAt: timestampSchema.nullable().default(null),
  // Minimum number of remote participants that must be present for this
  // announcement to play. Defaults to 2 (the room's normal audience). Closing
  // announcements (wrap-up, final handoff) set this to 1 so they still play to a
  // lone remaining listener — e.g. when a partner's connection has dropped right
  // as the round ends, which previously caused the wrap-up to be skipped.
  requireMinParticipants: yup.number().optional().default(2),
});

export type AnnouncementStep = yup.InferType<typeof announcementStepSchema>;
export type AnnouncementStepType = yup.InferType<
  typeof announcementStepTypeSchema
>;
export type RoomAnnouncement = yup.InferType<typeof roomAnnouncementSchema>;
export type RoomAnnouncementKind = yup.InferType<
  typeof roomAnnouncementKindSchema
>;
export type RoomAnnouncementSound = yup.InferType<
  typeof roomAnnouncementSoundSchema
>;
