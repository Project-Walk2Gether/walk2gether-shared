import * as yup from "yup";
import { baseInvitationSchema } from "./base";

export const existingUserWalkInvitationSchema = baseInvitationSchema.shape({
  type: yup.mixed<"existingUserWalk">().oneOf(["existingUserWalk"]),
  walkId: yup.string().required(),
  recipientUserId: yup.string().optional(),
});
export type ExistingUserWalkInvitation = yup.InferType<
  typeof existingUserWalkInvitationSchema
>;
