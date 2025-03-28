import * as yup from "yup";
import {
  ExistingUserWalkInvitation,
  existingUserWalkInvitationSchema,
} from "./existingUserInvitation";
import { friendRequestInvitationSchema } from "./friendRequestInvitation";
import {
  NewUserWalkInvitation,
  newUserWalkInvitationSchema,
} from "./newUserInvitation";

export * from "./existingUserInvitation";
export * from "./friendRequestInvitation";
export * from "./newUserInvitation";

// Map of walk types to their schemas
export const invitationSchemas = {
  existingUserWalk: existingUserWalkInvitationSchema,
  newUserWalk: newUserWalkInvitationSchema,
  friendRequest: friendRequestInvitationSchema,
};

// Dynamic schema that selects the appropriate schema based on the walk type
export const invitationSchema = yup.lazy((value) => {
  if (typeof value?.type === "string" && value.type in invitationSchemas) {
    return invitationSchemas[value.type as keyof typeof invitationSchemas];
  }

  // Fallback schema for validation when type is missing or invalid
  return yup.object({
    type: yup
      .string()
      .oneOf(Object.keys(invitationSchemas))
      .required("Invitation type is required"),
  });
});

export type Invitation = NewUserWalkInvitation | ExistingUserWalkInvitation;

// Type guard functions
export const invitationIsExistingUserWalkInvitation = (
  value: Invitation
): value is ExistingUserWalkInvitation => value.type === "existingUserWalk";
export const isValidExistingUserWalkInvitation = (
  value: unknown
): value is ExistingUserWalkInvitation => {
  try {
    existingUserWalkInvitationSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
};

export const invitationIsNewUserWalkInvitation = (
  value: Invitation
): value is NewUserWalkInvitation => value.type === "newUserWalk";

export const isValidNewUserWalkInvitation = (
  value: unknown
): value is NewUserWalkInvitation => {
  try {
    newUserWalkInvitationSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
};
