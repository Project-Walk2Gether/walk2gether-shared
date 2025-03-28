import * as yup from "yup";
import { baseInvitationSchema } from "./base";

export const friendRequestInvitationSchema = baseInvitationSchema.shape({
  type: yup.mixed<"friendRequest">().oneOf(["friendRequest"]),
  walkId: yup.string().required(),
  recipientPhoneNumber: yup.string().optional(),
  code: yup.string().required(),
});
export type FriendRequestInvitation = yup.InferType<
  typeof friendRequestInvitationSchema
>;
