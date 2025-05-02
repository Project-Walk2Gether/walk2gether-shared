import * as yup from "yup";
export declare const invitationSchema: yup.ObjectSchema<{
    invitingUserId: string;
    acceptedAt: import("./utils/firebase").Timestamp | undefined;
    walkId: string;
    recipientPhoneNumber: string | undefined;
    code: string;
}, yup.AnyObject, {
    invitingUserId: undefined;
    acceptedAt: undefined;
    walkId: undefined;
    recipientPhoneNumber: undefined;
    code: undefined;
}, "">;
