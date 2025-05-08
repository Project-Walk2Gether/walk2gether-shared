import * as yup from "yup";
export declare const messageSchema: yup.ObjectSchema<{
    id: string | undefined;
    senderId: string;
    recipientId: string;
    message: string;
    createdAt: import("./utils/firebase").Timestamp | undefined;
    updatedAt: import("./utils/firebase").Timestamp | undefined;
    read: boolean;
    attachments: {
        sizeBytes?: number | undefined;
        metadata?: {
            width?: number | undefined;
            height?: number | undefined;
        } | undefined;
        uri: string;
        storagePath: string;
        contentType: string;
        type: "image";
    }[] | undefined;
}, yup.AnyObject, {
    id: undefined;
    senderId: undefined;
    recipientId: undefined;
    message: undefined;
    createdAt: undefined;
    updatedAt: undefined;
    read: false;
    attachments: "";
}, "">;
export type Message = yup.InferType<typeof messageSchema>;
