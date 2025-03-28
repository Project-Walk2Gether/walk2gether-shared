import * as yup from "yup";
export declare const existingUserWalkInvitationSchema: yup.ObjectSchema<{
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
export type ExistingUserWalkInvitation = yup.InferType<typeof existingUserWalkInvitationSchema>;
