import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const inviteAcceptanceSchema = yup.object({
  id: yup.string(),
  phoneNumber: yup.string().required(),
  // The invitation codes that were present in the URL
  friendInviteCode: yup.string().nullable().default(null),
  walkCode: yup.string().nullable().default(null),
  groupCode: yup.string().nullable().default(null),
  // Cached inviter info for display in the app
  inviterName: yup.string().nullable().default(null),
  inviterProfilePicUrl: yup.string().nullable().default(null),
  inviterUid: yup.string().nullable().default(null),
  // Cached group info for display in the app
  groupName: yup.string().nullable().default(null),
  groupDescription: yup.string().nullable().default(null),
  groupId: yup.string().nullable().default(null),
  // Whether this has been processed (finalized into friendship/group/walk)
  status: yup
    .string()
    .oneOf(["pending", "processed"])
    .required()
    .default("pending"),
  // The uid of the user who claimed this (set when they sign up)
  claimedByUid: yup.string().nullable().default(null),
  processedAt: timestampSchema.nullable().default(undefined),
  createdAt: timestampSchema,
});

export type InviteAcceptance = yup.InferType<typeof inviteAcceptanceSchema>;
