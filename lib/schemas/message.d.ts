import * as yup from "yup";
export declare const messageSchema: yup.ObjectSchema<{
    id: string | undefined;
    senderId: string;
    recipientId: string;
    message: string;
    createdAt: import("./utils/firebase").Timestamp | undefined;
    updatedAt: import("./utils/firebase").Timestamp | undefined;
    read: boolean;
}, yup.AnyObject, {
    id: undefined;
    senderId: undefined;
    recipientId: undefined;
    message: undefined;
    createdAt: undefined;
    updatedAt: undefined;
    read: false;
}, "">;
export type Message = yup.InferType<typeof messageSchema>;
