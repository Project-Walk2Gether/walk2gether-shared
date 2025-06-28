/**
 * API types for Walk2Gether
 *
 * This file exports the API namespace with all endpoint types.
 */

// Import all API types
import {
  InvitationAcceptRequest,
  InvitationAcceptResponse,
  InvitationValidateRequest,
  InvitationValidateResponse,
} from "./invitation";

import { 
  UserDeleteRequest, 
  UserDeleteResponse, 
  UserAuthResponse,
  UserUpdateProfileRequest,
  UserUpdateProfileResponse 
} from "./user";

import { SMSSendInvitationsRequest, SMSSendInvitationsResponse } from "./sms";

// Export a single namespace for better organization
export namespace API {
  export namespace Invitation {
    export namespace Validate {
      export type RequestBody = InvitationValidateRequest;
      export type ResponseBody = InvitationValidateResponse;
    }

    export namespace Accept {
      export type RequestBody = InvitationAcceptRequest;
      export type ResponseBody = InvitationAcceptResponse;
    }
  }

  // User namespace
  export namespace User {
    export namespace Delete {
      export type RequestBody = UserDeleteRequest;
      export type ResponseBody = UserDeleteResponse;
    }

    export namespace Auth {
      export type ResponseBody = UserAuthResponse;
    }
    
    export namespace UpdateProfile {
      export type RequestBody = UserUpdateProfileRequest;
      export type ResponseBody = UserUpdateProfileResponse;
    }
  }

  // SMS namespace
  export namespace SMS {
    export namespace SendInvitations {
      export type RequestBody = SMSSendInvitationsRequest;
      export type ResponseBody = SMSSendInvitationsResponse;
    }
  }
}
