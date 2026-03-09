/**
 * API types for invitation endpoints
 */

import { Group, Walk } from "../schemas";

/**
 * Request type for the /invitation/validate endpoint
 */
export interface InvitationValidateRequest {
  data: {
    code?: string;
    walkCode?: string;
    groupCode?: string;
    inviterCode?: string;
  };
}

export interface InvitationValidateGroupMember {
  name: string;
  profilePicUrl: string | null;
}

export interface InvitationValidateGroupInfo {
  id: string;
  name: Group["name"];
  memberCount: number;
  members: InvitationValidateGroupMember[];
}

/**
 * Response type for the /invitation/validate endpoint
 */
export interface InvitationValidateResponse {
  success: boolean;
  inviter?: {
    id: string;
    name: string;
    profilePicUrl: string | null;
    linkedInProfileUrl: string | null;
  };
  walk?: Walk;
  group?: InvitationValidateGroupInfo;
  error?: {
    message: string;
    status: number;
  };
}

/**
 * Request type for the /invitation/accept endpoint
 */
export interface InvitationAcceptRequest {
  data: {
    code?: string;
    walkCode?: string;
    groupCode?: string;
  };
}

/**
 * Response type for the /invitation/accept endpoint
 */
export interface InvitationAcceptResponse {
  success: boolean;
  message: string;
  alreadyConnected?: boolean;
  walkJoined?: boolean;
  walkId?: string;
  groupJoined?: boolean;
  groupId?: string;
  error?: {
    message: string;
    status: number;
  };
}

/**
 * Request type for the /invitation/accept-lightweight endpoint
 * Lightweight acceptance: only pairs a phone number with invite codes.
 * No authentication required.
 */
export interface InvitationAcceptLightweightRequest {
  data: {
    phoneNumber: string;
    code?: string;
    walkCode?: string;
    groupCode?: string;
    inviterCode?: string;
  };
}

/**
 * Response type for the /invitation/accept-lightweight endpoint
 */
export interface InvitationAcceptLightweightResponse {
  success: boolean;
  message: string;
  error?: {
    message: string;
    status: number;
  };
}

/**
 * Pending invite acceptance info returned when querying for a user's phone number
 */
export interface PendingInviteAcceptanceInfo {
  id: string;
  inviterName: string | null;
  inviterProfilePicUrl: string | null;
  inviterUid: string | null;
  groupName: string | null;
  groupDescription: string | null;
  groupId: string | null;
  friendInviteCode: string | null;
  walkCode: string | null;
  groupCode: string | null;
}
