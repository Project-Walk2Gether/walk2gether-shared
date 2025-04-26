import * as yup from "yup";
import { locationSchema } from "./location";

export const userDataSchema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  location: locationSchema.optional(),
  profilePicUrl: yup.string().url().optional(),
  friendInvitationCode: yup.string().required(),
  expoPushToken: yup.string().nullable(),
  deviceInfo: yup.mixed(),
  aboutMe: yup.string().optional(),
  notificationPreferences: yup.object({
    friendETA: yup.boolean().optional(),
  }),
});

export type UserData = yup.InferType<typeof userDataSchema>;
