import * as yup from "yup";
import { locationSchema } from "./location";

export const userDataSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  age: yup.string().oneOf(["Younger", "Older"]).required(),
  location: locationSchema,
  email: yup.string().email().required(),
  profilePicUrl: yup.string().url().optional(),
  friendInvitationCode: yup.string().required(),
  expoPushToken: yup.string(),
  deviceInfo: yup.mixed(),
  aboutMe: yup.string().optional(),
});

export type UserData = yup.InferType<typeof userDataSchema>;
