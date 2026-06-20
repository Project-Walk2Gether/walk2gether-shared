import * as yup from "yup";
import { walkBaseSchema } from "./base";

export const friendsWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"friends">().oneOf(["friends"]).required(),
  // Optional conversation topic/intention. Unlike group walks (where topic is
  // required), friends walks may or may not have one.
  topic: yup.string().optional(),
});

export type FriendsWalk = yup.InferType<typeof friendsWalkSchema>;
