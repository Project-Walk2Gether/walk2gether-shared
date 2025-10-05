import * as yup from "yup";
import { locationSchema } from "../location";
import { walkBaseSchema } from "./base";

export const friendsWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"friends">().oneOf(["friends"]).required(),
  startLocation: locationSchema.required(),
});

export type FriendsWalk = yup.InferType<typeof friendsWalkSchema>;
