/**
 * API types for SMS endpoints
 */

/**
 * Request type for the /sms/send-invitations endpoint
 */
export interface SMSSendInvitationsRequest {
  data: {
    phoneNumbers: string[];
    message: string;
  };
}

/**
 * Response type for the /sms/send-invitations endpoint
 */
export interface SMSSendInvitationsResponse {
  success: boolean;
  results: {
    phoneNumber: string;
    status: 'success' | 'failed';
    message?: string;
    sid?: string;
  }[];
  error?: {
    message: string;
    status: number;
  };
}
