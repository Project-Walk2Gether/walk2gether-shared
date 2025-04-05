import * as yup from "yup";
import { baseInvitationSchema } from "./base";

export const existingUserInvitationSchema = baseInvitationSchema.shape({
  type: yup.mixed<"existingUser">().oneOf(["existingUser"]),
  recipientUserId: yup.string().optional(),
});
export type ExistingUserInvitation = yup.InferType<
  typeof existingUserInvitationSchema
>;
