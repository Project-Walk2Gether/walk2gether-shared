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

/**
 * Response type for the /user/auth/:uid endpoint
 */
export interface UserAuthResponse {
  uid: string;
  email?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  disabled: boolean;
  creationTime: string;
  lastSignInTime?: string;
}

/**
 * Request type for the /user/update-profile endpoint
 */
export interface UserUpdateProfileRequest {
  displayName?: string;
  photoURL?: string;
}

/**
 * Response type for the /user/update-profile endpoint
 */
export interface UserUpdateProfileResponse {
  success: boolean;
  message?: string;
  error?: {
    message: string;
    status: number;
  };
}
