import * as yup from "yup";
import { walkBaseSchema } from "./base";

export const remoteWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"remote">().oneOf(["remote"]).required(),
});

export type RemoteWalk = yup.InferType<typeof remoteWalkSchema>;
