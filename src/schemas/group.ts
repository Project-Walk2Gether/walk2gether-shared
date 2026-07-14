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
  // Discoverability. "public" groups can be discovered/joined by any user;
  // "private" (the default, and the implicit value for legacy groups with no
  // field) are invite-only.
  visibility: yup
    .mixed<"public" | "private">()
    .oneOf(["public", "private"])
    .default("private"),
  // Curated flag (admin/seed-controlled, not user-settable) that promotes a
  // group in the onboarding "join a group" step. Only featured groups are shown
  // there; defaults to false so user-created groups are never auto-promoted.
  featured: yup.boolean().default(false),
  membersById: yup
    .mixed<Record<string, GroupMemberSummary>>()
    .optional()
    .default(undefined),
});

export type Group = yup.InferType<typeof groupSchema>;
