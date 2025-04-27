import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const friendRequestSchema = yup.object({
  sendingUserId: yup.string().required(),
  receivingUserId: yup.string().required(),
  acceptedAt: timestampSchema,
});

export type FriendRequest = yup.InferType<typeof friendRequestSchema>;
