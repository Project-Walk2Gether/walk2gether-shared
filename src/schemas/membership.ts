import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const membershipSchema = yup.object({
  userId: yup.string().required(),
  groupId: yup.string().required(),
  status: yup
    .mixed<"active" | "departed" | "removed">()
    .oneOf(["active", "departed", "removed"])
    .required(),
  role: yup
    .mixed<"member" | "creator">()
    .oneOf(["member", "creator"])
    .required()
    .default("member"),
  notifyNewGroupWalks: yup.boolean().required().default(true),
  joinedAt: timestampSchema.required(),
});

export type Membership = yup.InferType<typeof membershipSchema>;
