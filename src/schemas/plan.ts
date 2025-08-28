import * as yup from "yup";
import {
  DocumentReferenceLike,
  documentReferenceSchema,
} from "../firestore/documentReference";
import { availabilitySchema } from "./availability";
import { userDataSchema } from "./userData";
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
  user: userDataSchema.required(),
  invitedFriend: documentReferenceSchema.required() as yup.MixedSchema<
    DocumentReferenceLike<unknown>
  >, // ref to users/{uid}
  availability: availabilitySchema.required(),
  status: yup
    .mixed<PlanStatus>()
    .oneOf(planStatusValues as any)
    .required(),
  invitedFriendAcceptedAt: timestampSchema,
  cancelledAt: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Plan = yup.InferType<typeof planSchema>;
