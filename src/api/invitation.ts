/**
 * API types for invitation endpoints
 */

/**
 * Request type for the /invitation/validate endpoint
 */
export interface InvitationValidateRequest {
  data: {
    code: string;
    walkCode?: string;
  };
}

/**
 * Response type for the /invitation/validate endpoint
 */
export interface InvitationValidateResponse {
  success: boolean;
  inviter: {
    id: string;
    name: string;
    profilePicUrl: string | null;
  };
  walk?: {
    id: string;
    title: string;
    date: any; // Timestamp
    startLocation: {
      name: string;
      latitude: number;
      longitude: number;
    };
    durationMinutes: number;
    invitationCode: string;
  } | null;
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
    code: string;
    walkCode?: string;
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
  error?: {
    message: string;
    status: number;
  };
}
