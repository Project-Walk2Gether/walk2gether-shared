import { Availability, Plan, PlanStatus } from "../schemas";

// Request/response types for planning endpoints

export type GetPlansRequest = Record<string, never>;
export type GetPlansResponse = Array<Plan & { id: string }>;

export type GetFriendsRequest = Record<string, never>;
export type GetFriendsResponse = Array<{
  id: string;
  uid?: string;
  name?: string;
  profilePicUrl?: string | null;
}>;

export type CreatePlanRequest = {
  availability: Availability;
  invitedFriendPath: string; // users/{uid}
  user: any; // userData snapshot; typed loosely to avoid admin/client mismatch
};
export type CreatePlanResponse = Plan & { id: string };
