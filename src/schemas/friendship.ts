import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const friendshipSchema = yup.object({
  uids: yup.array().of(yup.string().required()).required(),
  acceptedAt: timestampSchema,
});

export type Friendship = yup.InferType<typeof friendshipSchema>;
