import * as yup from "yup";
export declare enum NotificationType {
    NEW_WALK = "NEW_WALK",
    WALK_INVITE = "WALK_INVITE",
    WALK_REMINDER = "WALK_REMINDER",
    WALK_CANCELLED = "WALK_CANCELLED",
    WALK_UPDATED = "WALK_UPDATED"
}
export declare const notificationSchema: yup.ObjectSchema<{
    id: string | undefined;
    userId: string;
    type: NonNullable<NotificationType | undefined>;
    title: string;
    body: string;
    data: {};
    read: boolean;
    sent: boolean;
    createdAt: import("./utils/firebase").Timestamp | undefined;
    updatedAt: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    id: undefined;
    userId: undefined;
    type: undefined;
    title: undefined;
    body: undefined;
    data: {};
    read: false;
    sent: false;
    createdAt: undefined;
    updatedAt: undefined;
}, "">;
export type Notification = yup.InferType<typeof notificationSchema>;
