import * as yup from "yup";
import { FriendsWalk, friendsWalkSchema } from "./friends";
import { MeetupWalk, meetupWalkSchema } from "./meetup";
import { NeighborhoodWalk, neighborhoodWalkSchema } from "./neighborhood";
import { RemoteWalk, remoteWalkSchema } from "./remote";

export * from "./base";
export * from "./friends";
export * from "./neighborhood";
export * from "./meetup";
export * from "./remote";

// Re-export specific types for convenience
export { TimeOption, WalkBase } from "./base";

// Map of walk types to their schemas
export const walkSchemas = {
  friends: friendsWalkSchema,
  neighborhood: neighborhoodWalkSchema,
  meetup: meetupWalkSchema,
  remote: remoteWalkSchema,
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

export const walkIsRemoteWalk = (value: Walk): value is RemoteWalk =>
  value.type === "remote";
export const isValidRemoteWalk = (value: unknown): value is RemoteWalk => {
  try {
    friendsWalkSchema.validateSync(value);
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

export const walkIsMeetupWalk = (value: Walk): value is MeetupWalk =>
  value.type === "meetup";
export const isValidMeetupWalk = (value: unknown): value is MeetupWalk => {
  try {
    meetupWalkSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
};

export type Walk = FriendsWalk | NeighborhoodWalk | MeetupWalk | RemoteWalk
