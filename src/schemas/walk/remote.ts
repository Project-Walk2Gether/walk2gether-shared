import * as yup from "yup";
import { walkBaseSchema } from "./base";

export const remoteWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"remote">().oneOf(["remote"]),
});

export type RemoteWalk = yup.InferType<typeof remoteWalkSchema>;
