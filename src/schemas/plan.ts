import * as yup from "yup";
import { documentReferenceSchema } from "../firestore/documentReference";
import { availabilitySchema } from "./availability";
import { locationOptionSchema } from "./locationOption";
import { timeOptionSchema } from "./timeOption";
import { timestampSchema } from "./utils/timestamp";

export const planStatusValues = [
  "pending",
  "succeeded",
  "failed",
  "cancelled",
] as const;

export type PlanStatus = (typeof planStatusValues)[number];

export const planSchema = yup.object({
  id: yup.string().optional(),
  initiatingUser: documentReferenceSchema.required(),
  invitedFriend: documentReferenceSchema.optional(),
  title: yup.string().required(),
  availability: availabilitySchema.required(),
  status: yup.mixed<PlanStatus>().oneOf(planStatusValues).required(),
  invitedFriendIsInterested: yup.boolean().optional(),
  invitedFriendCantMakeIt: yup.boolean().optional(),
  timeOptions: yup.array().of(timeOptionSchema).optional().default([]),
  chosenTimeOption: timeOptionSchema.optional(),
  locationOptions: yup.array().of(locationOptionSchema).optional().default([]),
  chosenLocationOption: locationOptionSchema.optional(),
  walkDoc: documentReferenceSchema.optional(),
  invitationCode: yup.string().optional(),
  expiresAt: timestampSchema,
  cancelledAt: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Plan = yup.InferType<typeof planSchema>;
