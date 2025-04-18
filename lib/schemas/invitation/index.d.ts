import * as yup from "yup";
import { ExistingUserInvitation } from "./existingUserInvitation";
import { NewUserInvitation } from "./newUserInvitation";
export * from "./existingUserInvitation";
export * from "./newUserInvitation";
export declare const invitationSchemas: {
    existingUser: yup.ObjectSchema<{
        invitingUserId: string;
        acceptedAt: import("../utils/firebase").Timestamp | undefined;
        walkId: string;
        type: "existingUser" | undefined;
        recipientUserId: string | undefined;
    }, yup.AnyObject, {
        invitingUserId: undefined;
        acceptedAt: undefined;
        walkId: undefined;
        type: undefined;
        recipientUserId: undefined;
    }, "">;
    newUser: yup.ObjectSchema<{
        invitingUserId: string;
        acceptedAt: import("../utils/firebase").Timestamp | undefined;
        walkId: string;
        type: "newUser" | undefined;
        recipientPhoneNumber: string | undefined;
        code: string;
    }, yup.AnyObject, {
        invitingUserId: undefined;
        acceptedAt: undefined;
        walkId: undefined;
        type: undefined;
        recipientPhoneNumber: undefined;
        code: undefined;
    }, "">;
};
export declare const invitationSchema: yup.Lazy<{
    acceptedAt?: import("../utils/firebase").Timestamp | undefined;
    type?: "existingUser" | undefined;
    recipientUserId?: string | undefined;
    invitingUserId: string;
    walkId: string;
} | {
    acceptedAt?: import("../utils/firebase").Timestamp | undefined;
    type?: "newUser" | undefined;
    recipientPhoneNumber?: string | undefined;
    invitingUserId: string;
    walkId: string;
    code: string;
} | {
    type: string;
}, yup.AnyObject, any>;
export type Invitation = NewUserInvitation | ExistingUserInvitation;
export declare const invitationIsExistingUserInvitation: (value: Invitation) => value is ExistingUserInvitation;
export declare const isValidExistingUserInvitation: (value: unknown) => value is ExistingUserInvitation;
export declare const invitationIsNewUserInvitation: (value: Invitation) => value is NewUserInvitation;
export declare const isValidNewUserInvitation: (value: unknown) => value is NewUserInvitation;
