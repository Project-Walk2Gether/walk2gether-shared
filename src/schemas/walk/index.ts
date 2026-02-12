import * as yup from "yup";
import { FriendsWalk, friendsWalkSchema } from "./friends";
import { GroupWalk, groupWalkSchema } from "./group";

export * from "./base";
export * from "./friends";
export * from "./group";

// Re-export specific types for convenience
export { WalkBase } from "./base";

// Map of walk types to their schemas
export const walkSchemas = {
  friends: friendsWalkSchema,
  group: groupWalkSchema,
};

// Dynamic schema that selects the appropriate schema based on the walk type
export const walkSchema = yup.lazy((value) => {
  if (typeof value?.type === "string" && value.type in walkSchemas) {
    return walkSchemas[value.type as keyof typeof walkSchemas];
  }

  // Fallback schema for validation when type is missing or invalid
  return yup.object({
    type: yup
      .string()
      .oneOf(Object.keys(walkSchemas))
      .required("Walk type is required"),
  });
});

export const walkIsFriendsWalk = (value: Walk): value is FriendsWalk =>
  value.type === "friends";
export const isValidFriendsWalk = (value: unknown): value is FriendsWalk => {
  try {
    friendsWalkSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
};

export const walkIsGroupWalk = (value: Walk): value is GroupWalk =>
  value.type === "group";
export const isValidGroupWalk = (value: unknown): value is GroupWalk => {
  try {
    groupWalkSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
};

export type Walk = FriendsWalk | GroupWalk;
