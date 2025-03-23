import * as yup from "yup";
import {
  ExistingUserInvitation,
  existingUserInvitationSchema,
} from "./existingUserInvitation";
import {
  NewUserInvitation,
  newUserInvitationSchema,
} from "./newUserInvitation";

export * from "./existingUserInvitation";
export * from "./newUserInvitation";

// Map of walk types to their schemas
export const invitationSchemas = {
  existingUser: existingUserInvitationSchema,
  newUser: newUserInvitationSchema,
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

export type Invitation = NewUserInvitation | ExistingUserInvitation;

// Type guard functions
export const invitationIsExistingUserInvitation = (
  value: Invitation
): value is ExistingUserInvitation => value.type === "existingUser";
export const isValidExistingUserInvitation = (
  value: unknown
): value is ExistingUserInvitation => {
  try {
    existingUserInvitationSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
};

export const invitationIsNewUserInvitation = (
  value: Invitation
): value is NewUserInvitation => value.type === "newUser";

export const isValidNewUserInvitation = (
  value: unknown
): value is NewUserInvitation => {
  try {
    existingUserInvitationSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
};
