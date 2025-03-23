import * as yup from "yup";
import { walkBaseSchema } from "./base";

export const friendWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"friend">().oneOf(["friend"]),
  invitedUserIds: yup.array().of(yup.string().required()).max(1),
});

export type FriendWalk = yup.InferType<typeof friendWalkSchema>;
