import * as yup from "yup";
import { timestampSchema } from "../utils/timestamp";

export const baseInvitationSchema = yup.object({
  invitingUserId: yup.string().required(),
  acceptedAt: timestampSchema.optional(),
});
