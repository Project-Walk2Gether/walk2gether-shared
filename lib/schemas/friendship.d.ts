import * as yup from "yup";
export declare const friendRequestSchema: yup.ObjectSchema<{
    sendingUserId: string;
    receivingUserId: string;
    acceptedAt: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    sendingUserId: undefined;
    receivingUserId: undefined;
    acceptedAt: undefined;
}, "">;
export type FriendRequest = yup.InferType<typeof friendRequestSchema>;
