import * as yup from "yup";
import { FriendGroupWalk, friendGroupWalkSchema } from "./friendGroupWalk";
import { FriendWalk, friendWalkSchema } from "./friendWalk";
import { NeighborhoodWalk, neighborhoodWalkSchema } from "./neighborhoodWalk";

export * from "./friendGroupWalk";
export * from "./friendWalk";
export * from "./neighborhoodWalk";

// Map of walk types to their schemas
export const walkSchemas = {
  friend: friendWalkSchema,
  friendGroup: friendGroupWalkSchema,
  neighborhood: neighborhoodWalkSchema,
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
      .required("Tactic type is required"),
  });
});

export const walkIsFriendWalk = (value: Walk): value is FriendWalk =>
  value.type === "friend";
export const isValidFriendWalk = (value: unknown): value is FriendWalk => {
  try {
    friendWalkSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
};

export const walkIsFriendGroupWalk = (value: Walk): value is FriendGroupWalk =>
  value.type === "friendGroup";
export const isValidFriendGroupWalk = (
  value: unknown
): value is FriendGroupWalk => {
  try {
    friendGroupWalkSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
};

export const walkIsNeighborhoodWalk = (
  value: Walk
): value is NeighborhoodWalk => value.type === "neighborhood";
export const isValidNeighborhoodWalk = (
  value: unknown
): value is NeighborhoodWalk => {
  try {
    neighborhoodWalkSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
};

export type Walk = FriendWalk | NeighborhoodWalk | FriendGroupWalk;
