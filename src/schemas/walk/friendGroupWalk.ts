import * as yup from "yup";
import { walkBaseSchema } from "./base";

export const friendGroupWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"friendGroup">().oneOf(["friendGroup"]),
  invitedUserIds: yup.array().of(yup.string().required()).max(1),
});

export type FriendGroupWalk = yup.InferType<typeof friendGroupWalkSchema>;
