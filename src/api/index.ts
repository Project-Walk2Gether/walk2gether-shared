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

import { API as TravelTimeAPI } from "./travelTime";
import {
  GetPlansRequest,
  GetPlansResponse,
  GetFriendsRequest,
  GetFriendsResponse,
  CreatePlanRequest,
  CreatePlanResponse,
} from "./plan";

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
  
  // Travel Time namespace
  export namespace TravelTime {
    export namespace Check {
      export type RequestBody = TravelTimeAPI.TravelTime.Check.RequestBody;
      export type ResponseBody = TravelTimeAPI.TravelTime.Check.ResponseBody;
    }
  }

  // Planning namespace
  export namespace Plan {
    export namespace GetPlans {
      export type RequestBody = GetPlansRequest;
      export type ResponseBody = GetPlansResponse;
    }
    export namespace GetFriends {
      export type RequestBody = GetFriendsRequest;
      export type ResponseBody = GetFriendsResponse;
    }
    export namespace Create {
      export type RequestBody = CreatePlanRequest;
      export type ResponseBody = CreatePlanResponse;
    }
  }
}
