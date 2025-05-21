/**
 * API types for user endpoints
 */

/**
 * Request type for the /user/delete endpoint
 */
export interface UserDeleteRequest {
  // No request body needed, authentication is handled via Firebase Auth
}

/**
 * Response type for the /user/delete endpoint
 */
export interface UserDeleteResponse {
  success: boolean;
  message?: string;
  error?: {
    message: string;
    status: number;
  };
}
