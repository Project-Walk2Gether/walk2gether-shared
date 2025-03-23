import * as yup from "yup";
export declare const invitationSchema: yup.ObjectSchema<{
    invitingUserId: string;
    recipientUserId: string | undefined;
    recipientPhoneNumber: string | undefined;
    acceptedAt: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    invitingUserId: undefined;
    recipientUserId: undefined;
    recipientPhoneNumber: undefined;
    acceptedAt: undefined;
}, "">;
export type Invitation = yup.InferType<typeof invitationSchema>;
