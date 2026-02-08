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
  };
}

export interface InvitationValidateGroupInfo {
  id: string;
  name: Group["name"];
  memberCount: number;
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
