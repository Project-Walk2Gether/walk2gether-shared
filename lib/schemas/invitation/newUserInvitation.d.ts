import * as yup from "yup";
export declare const newUserInvitationSchema: yup.ObjectSchema<{
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
export type NewUserInvitation = yup.InferType<typeof newUserInvitationSchema>;
