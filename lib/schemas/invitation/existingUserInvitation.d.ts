import * as yup from "yup";
export declare const existingUserInvitationSchema: yup.ObjectSchema<{
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
export type ExistingUserInvitation = yup.InferType<typeof existingUserInvitationSchema>;
