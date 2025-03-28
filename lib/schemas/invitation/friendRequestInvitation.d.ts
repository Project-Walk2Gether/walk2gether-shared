import * as yup from "yup";
export declare const friendRequestInvitationSchema: yup.ObjectSchema<{
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
export type FriendRequestInvitation = yup.InferType<typeof friendRequestInvitationSchema>;
