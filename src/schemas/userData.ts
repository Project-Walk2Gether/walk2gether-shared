import * as yup from "yup";
import { locationSchema } from "./location";

export const userDataSchema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  location: locationSchema,
  profilePicUrl: yup.string().url().optional(),
  friendInvitationCode: yup.string().required(),
  expoPushToken: yup.string().nullable(),
  deviceInfo: yup.mixed(),
  aboutMe: yup.string().optional(),
});

export type UserData = yup.InferType<typeof userDataSchema>;
