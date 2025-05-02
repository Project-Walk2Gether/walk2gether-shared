import * as yup from "yup";
export declare const friendshipSchema: yup.ObjectSchema<{
    uids: string[];
    acceptedAt: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    uids: "";
    acceptedAt: undefined;
}, "">;
export type Friendship = yup.InferType<typeof friendshipSchema>;
