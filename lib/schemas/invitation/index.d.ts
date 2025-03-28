import * as yup from "yup";
import { ExistingUserWalkInvitation } from "./existingUserInvitation";
import { NewUserWalkInvitation } from "./newUserInvitation";
export * from "./existingUserInvitation";
export * from "./friendRequestInvitation";
export * from "./newUserInvitation";
export declare const invitationSchemas: {
    existingUserWalk: yup.ObjectSchema<{
        invitingUserId: string;
        acceptedAt: import("../utils/firebase").Timestamp | undefined;
        type: "existingUserWalk" | undefined;
        walkId: string;
        recipientUserId: string | undefined;
    }, yup.AnyObject, {
        invitingUserId: undefined;
        acceptedAt: undefined;
        type: undefined;
        walkId: undefined;
        recipientUserId: undefined;
    }, "">;
    newUserWalk: yup.ObjectSchema<{
        invitingUserId: string;
        acceptedAt: import("../utils/firebase").Timestamp | undefined;
        type: "newUserWalk" | undefined;
        walkId: string;
        recipientPhoneNumber: string | undefined;
        code: string;
    }, yup.AnyObject, {
        invitingUserId: undefined;
        acceptedAt: undefined;
        type: undefined;
        walkId: undefined;
        recipientPhoneNumber: undefined;
        code: undefined;
    }, "">;
    friendRequest: yup.ObjectSchema<{
        invitingUserId: string;
        acceptedAt: import("../utils/firebase").Timestamp | undefined;
        type: "friendRequest" | undefined;
        walkId: string;
        recipientPhoneNumber: string | undefined;
        code: string;
    }, yup.AnyObject, {
        invitingUserId: undefined;
        acceptedAt: undefined;
        type: undefined;
        walkId: undefined;
        recipientPhoneNumber: undefined;
        code: undefined;
    }, "">;
};
export declare const invitationSchema: yup.Lazy<{
    acceptedAt?: import("../utils/firebase").Timestamp | undefined;
    type?: "existingUserWalk" | undefined;
    recipientUserId?: string | undefined;
    invitingUserId: string;
    walkId: string;
} | {
    acceptedAt?: import("../utils/firebase").Timestamp | undefined;
    type?: "friendRequest" | undefined;
    recipientPhoneNumber?: string | undefined;
    invitingUserId: string;
    walkId: string;
    code: string;
} | {
    acceptedAt?: import("../utils/firebase").Timestamp | undefined;
    type?: "newUserWalk" | undefined;
    recipientPhoneNumber?: string | undefined;
    invitingUserId: string;
    walkId: string;
    code: string;
} | {
    type: string;
}, yup.AnyObject, any>;
export type Invitation = NewUserWalkInvitation | ExistingUserWalkInvitation;
export declare const invitationIsExistingUserWalkInvitation: (value: Invitation) => value is ExistingUserWalkInvitation;
export declare const isValidExistingUserWalkInvitation: (value: unknown) => value is ExistingUserWalkInvitation;
export declare const invitationIsNewUserWalkInvitation: (value: Invitation) => value is NewUserWalkInvitation;
export declare const isValidNewUserWalkInvitation: (value: unknown) => value is NewUserWalkInvitation;
