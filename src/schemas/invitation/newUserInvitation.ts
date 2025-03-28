import * as yup from "yup";
import { baseInvitationSchema } from "./base";

export const newUserWalkInvitationSchema = baseInvitationSchema.shape({
  type: yup.mixed<"newUserWalk">().oneOf(["newUserWalk"]),
  walkId: yup.string().required(),
  recipientPhoneNumber: yup.string().optional(),
  code: yup.string().required(),
});
export type NewUserWalkInvitation = yup.InferType<
  typeof newUserWalkInvitationSchema
>;
