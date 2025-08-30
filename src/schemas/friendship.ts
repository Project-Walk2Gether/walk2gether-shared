import * as yup from "yup";
import { objectOf } from "../utils/objectOf";
import { timestampSchema } from "./utils/timestamp";

export const friendshipSchema = yup.object({
  id: yup.string(),
  uids: yup
    .array()
    .of(yup.string().required())
    .required()
    .min(2, "A friendship must have 2 users")
    .max(2, "A friendship cannot have more than 2 users")
    .test("unique-uids", "User IDs must be unique in a friendship", (uids) => {
      if (!uids) return true;
      const uniqueUids = [...new Set(uids)];
      return uniqueUids.length === uids.length;
    })
    .test(
      "different-users",
      "Cannot create a friendship with yourself",
      (uids) => {
        if (!uids || uids.length !== 2) return true;
        return uids[0] !== uids[1];
      }
    ),
  // Simplified schema specifically for friendship user data
  userDataByUid: objectOf(
    yup.object({
      name: yup.string().required(),
      profilePicUrl: yup.string().nullable(),
      _isSettingUp: yup.boolean().optional(),
    })
  ),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  createdByUid: yup.string().required(),
  acceptedAt: timestampSchema,
  deletedAt: timestampSchema.nullable().defined(),
  deletedByUid: yup.string().optional(),
  reportedAt: timestampSchema,
  reportedByUid: yup.string().optional(),
  reportReason: yup.string().optional(),
  lastMessageAt: timestampSchema,
  lastMessagePreview: yup.string().optional(),
  totalMilesWalked: yup.number(),
});

export type Friendship = yup.InferType<typeof friendshipSchema>;
