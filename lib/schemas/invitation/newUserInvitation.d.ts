import * as yup from "yup";
export declare const newUserInvitationSchema: yup.ObjectSchema<{
    invitingUserId: string;
    acceptedAt: import("../utils/firebase").Timestamp | undefined;
    type: "newUser" | undefined;
    recipientPhoneNumber: string | undefined;
}, yup.AnyObject, {
    invitingUserId: undefined;
    acceptedAt: undefined;
    type: undefined;
    recipientPhoneNumber: undefined;
}, "">;
export type NewUserInvitation = yup.InferType<typeof newUserInvitationSchema>;
