import * as yup from "yup";
export declare const friendshipSchema: yup.ObjectSchema<{
    id: string | undefined;
    uids: string[];
    userDataByUid: {
        [x: string]: {
            location?: {
                placeId?: string | undefined;
                name: string;
                latitude: number;
                longitude: number;
            } | undefined;
            id?: string | undefined;
            profilePicUrl?: string | undefined;
            expoPushToken?: string | null | undefined;
            deviceInfo?: any;
            aboutMe?: string | undefined;
            name: string;
            friendInvitationCode: string;
            notificationPreferences: {
                friendETA?: boolean | undefined;
            };
        };
    };
    createdAt: import("./utils/firebase").Timestamp | undefined;
    updatedAt: import("./utils/firebase").Timestamp | undefined;
    createdByUid: string;
    acceptedAt: import("./utils/firebase").Timestamp | undefined;
    deletedAt: import("./utils/firebase").Timestamp | null;
    deletedByUid: string | undefined;
    reportedAt: import("./utils/firebase").Timestamp | undefined;
    reportedByUid: string | undefined;
    reportReason: string | undefined;
    lastMessageAt: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    id: undefined;
    uids: "";
    userDataByUid: undefined;
    createdAt: undefined;
    updatedAt: undefined;
    createdByUid: undefined;
    acceptedAt: undefined;
    deletedAt: undefined;
    deletedByUid: undefined;
    reportedAt: undefined;
    reportedByUid: undefined;
    reportReason: undefined;
    lastMessageAt: undefined;
}, "">;
export type Friendship = yup.InferType<typeof friendshipSchema>;
