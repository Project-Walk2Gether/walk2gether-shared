import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const invitationSchema = yup.object({
  invitingUserId: yup.string().required(),
  acceptedAt: timestampSchema.optional(),
  walkId: yup.string().required(),
  recipientPhoneNumber: yup.string().optional(),
  code: yup.string().required(),
});
