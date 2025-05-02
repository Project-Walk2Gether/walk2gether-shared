import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const friendshipSchema = yup.object({
  id: yup.string(),
  uids: yup.array()
    .of(yup.string().required())
    .required()
    .min(2, 'A friendship must have at least 2 users')
    .max(2, 'A friendship cannot have more than 2 users')
    .test(
      'unique-uids',
      'User IDs must be unique in a friendship',
      (uids) => {
        if (!uids) return true;
        const uniqueUids = [...new Set(uids)];
        return uniqueUids.length === uids.length;
      }
    )
    .test(
      'different-users',
      'Cannot create a friendship with yourself',
      (uids) => {
        if (!uids || uids.length !== 2) return true;
        return uids[0] !== uids[1];
      }
    ),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  createdByUid: yup.string().required(),
  acceptedAt: timestampSchema,
  lastMessageAt: timestampSchema,
});

export type Friendship = yup.InferType<typeof friendshipSchema>;
