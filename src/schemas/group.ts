import * as yup from "yup";

export interface GroupMemberSummary {
  displayName?: string | null;
  photoURL?: string | null;
}

export const groupSchema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  description: yup.string().nullable().default(null),
  avatarUrl: yup.string().nullable().default(null),
  invitationCode: yup.string().required(),
  createdByUid: yup.string().required(),
  communityId: yup.string().nullable().default(null),
  membersById: yup
    .mixed<Record<string, GroupMemberSummary>>()
    .optional()
    .default(undefined),
});

export type Group = yup.InferType<typeof groupSchema>;
