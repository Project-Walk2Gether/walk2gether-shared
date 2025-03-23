import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const invitationSchema = yup.object({
  invitingUserId: yup.string().required(),
  recipientUserId: yup.string().optional(),
  recipientPhoneNumber: yup.string().optional(),
  acceptedAt: timestampSchema.optional(),
});

export type Invitation = yup.InferType<typeof invitationSchema>;
