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

export const roomAnnouncementSchema = yup.object({
  id: yup.string(),
  kind: roomAnnouncementKindSchema,
  text: yup.string().required(),
  sound: roomAnnouncementSoundSchema,
  audioUrl: yup.string().nullable().default(null),
  playAt: timestampSchema.required(),
  createdAt: timestampSchema.required(),
  processedAt: timestampSchema.nullable().default(null),
});

export type RoomAnnouncement = yup.InferType<typeof roomAnnouncementSchema>;
export type RoomAnnouncementKind = yup.InferType<
  typeof roomAnnouncementKindSchema
>;
export type RoomAnnouncementSound = yup.InferType<
  typeof roomAnnouncementSoundSchema
>;
