import * as yup from "yup";

export const communityClaimRequestSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  communityName: yup.string().required(),
  role: yup.string().required(),
  message: yup.string().required(),
  createdAt: yup.mixed().required(),
});

export type CommunityClaimRequest = yup.InferType<
  typeof communityClaimRequestSchema
>;
