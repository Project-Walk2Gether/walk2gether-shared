import * as yup from "yup";
export declare const baseInvitationSchema: yup.ObjectSchema<{
    invitingUserId: string;
    acceptedAt: import("../utils/firebase").Timestamp | undefined;
    walkId: string;
}, yup.AnyObject, {
    invitingUserId: undefined;
    acceptedAt: undefined;
    walkId: undefined;
}, "">;
