import * as yup from "yup";
import { baseInvitationSchema } from "./base";

export const newUserInvitationSchema = baseInvitationSchema.shape({
  type: yup.mixed<"newUser">().oneOf(["newUser"]),
  recipientPhoneNumber: yup.string().optional(),
});
export type NewUserInvitation = yup.InferType<typeof newUserInvitationSchema>;
