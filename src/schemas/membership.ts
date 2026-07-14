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
  // Whether this member is included in the group's automatic weekly walk
  // matching (availability-based). Opt-OUT: on by default, and a legacy
  // membership doc with no field is treated as opted in. Set false to exclude
  // this member from auto-scheduled walks for this group.
  optIntoAutomaticMatching: yup.boolean().default(true),
  shouldNotify: yup.boolean().required().default(false),
  notificationSentAt: timestampSchema.nullable().defined(),
  joinedAt: timestampSchema.required(),
});

export type Membership = yup.InferType<typeof membershipSchema>;
