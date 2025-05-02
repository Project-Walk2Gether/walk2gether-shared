import * as yup from "yup";
export declare const friendshipSchema: yup.ObjectSchema<{
    id: string | undefined;
    uids: string[];
    createdAt: import("./utils/firebase").Timestamp | undefined;
    updatedAt: import("./utils/firebase").Timestamp | undefined;
    createdByUid: string;
    acceptedAt: import("./utils/firebase").Timestamp | undefined;
    lastMessageAt: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    id: undefined;
    uids: "";
    createdAt: undefined;
    updatedAt: undefined;
    createdByUid: undefined;
    acceptedAt: undefined;
    lastMessageAt: undefined;
}, "">;
export type Friendship = yup.InferType<typeof friendshipSchema>;
