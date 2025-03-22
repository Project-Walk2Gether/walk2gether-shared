import * as yup from "yup";

export const userDataSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  age: yup.string().oneOf(["Younger", "Older"]).required(),
  location: yup.string().required(),
  email: yup.string().email().required(),
  isAdmin: yup.boolean().optional(),
  profilePicUrl: yup.string().url().optional(),
  aboutMe: yup.string().optional(),
  fcmToken: yup.string().optional(),
});

export type UserData = yup.InferType<typeof userDataSchema>;
