import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const INTRODUCTION_STATUS_OPTIONS = ["pending", "connected"] as const;

export type IntroductionStatus = (typeof INTRODUCTION_STATUS_OPTIONS)[number];

export const INTRO_PERSON_STATUS_OPTIONS = [
  "pending",
  "viewed",
  "accepted",
] as const;

export type IntroPersonStatus = (typeof INTRO_PERSON_STATUS_OPTIONS)[number];

export const introPersonSchema = yup.object({
  uid: yup.string().nullable().default(null),
  name: yup.string().required(),
  profilePicUrl: yup.string().nullable().default(null),
  introCode: yup.string().required(),
  status: yup
    .string()
    .oneOf(INTRO_PERSON_STATUS_OPTIONS)
    .required()
    .default("pending"),
});

export type IntroPerson = yup.InferType<typeof introPersonSchema>;

export const introductionSchema = yup.object({
  id: yup.string(),
  introducerUid: yup.string().required(),
  introducerName: yup.string().required(),
  introducerProfilePicUrl: yup.string().nullable().default(null),
  persons: yup
    .array()
    .of(introPersonSchema.required())
    .required()
    .min(2)
    .max(2),
  reason: yup.string().required(),
  status: yup
    .string()
    .oneOf(INTRODUCTION_STATUS_OPTIONS)
    .required()
    .default("pending"),
  friendshipId: yup.string().nullable().default(null),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Introduction = yup.InferType<typeof introductionSchema>;
