import * as yup from "yup";
import {
  DocumentReferenceLike,
  documentReferenceSchema,
} from "../firestore/documentReference";
import { availabilitySchema } from "./availability";
import { timeOptionSchema } from "./timeOption";
import { UserData, userDataSchema } from "./userData";
import { timestampSchema } from "./utils/timestamp";
import { Walk } from "./walk";

export const planStatusValues = [
  "pending",
  "succeeded",
  "failed",
  "cancelled",
] as const;

export type PlanStatus = (typeof planStatusValues)[number];

export const planSchema = yup.object({
  id: yup.string().optional(),
  user: userDataSchema.required(),
  invitedFriend: documentReferenceSchema.required() as yup.MixedSchema<
    DocumentReferenceLike<UserData>
  >,
  availability: availabilitySchema.required(),
  status: yup.mixed<PlanStatus>().oneOf(planStatusValues).required(),
  invitedFriendIsInterested: yup.boolean().optional(),
  timeOptions: yup.array().of(timeOptionSchema).optional().default([]),
  chosenTimeOption: timeOptionSchema.optional(),
  walkDoc: documentReferenceSchema.optional() as yup.MixedSchema<
    DocumentReferenceLike<Walk>
  >,
  expiresAt: timestampSchema,
  cancelledAt: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Plan = yup.InferType<typeof planSchema>;
