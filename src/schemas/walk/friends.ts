import * as yup from "yup";
import { walkBaseSchema } from "./base";

export const friendsWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"friends">().oneOf(["friends"]),
  invitedUserIds: yup.array().of(yup.string().required()),
});

export type FriendsWalk = yup.InferType<typeof friendsWalkSchema>;
