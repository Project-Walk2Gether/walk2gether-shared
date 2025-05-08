import * as yup from "yup";
export declare const pairSchema: yup.ObjectSchema<{
    userUids: string[];
    color: string;
    emoji: string;
    isTriple: boolean | undefined;
}, yup.AnyObject, {
    userUids: "";
    color: undefined;
    emoji: undefined;
    isTriple: undefined;
}, "">;
export declare const roundSchema: yup.ObjectSchema<{
    walkId: string;
    roundNumber: number;
    startTime: import("../utils/firebase").Timestamp | undefined;
    endTime: import("../utils/firebase").Timestamp | undefined;
    pairs: {
        isTriple?: boolean | undefined;
        userUids: string[];
        color: string;
        emoji: string;
    }[];
}, yup.AnyObject, {
    walkId: undefined;
    roundNumber: undefined;
    startTime: undefined;
    endTime: undefined;
    pairs: "";
}, "">;
export declare const walkBaseSchema: yup.ObjectSchema<{
    id: string | undefined;
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
    rsvpdUserIds: string[] | undefined;
    invitedUserIds: string[] | undefined;
    currentLocation: {
        placeId?: string | undefined;
        name: string;
        latitude: number;
        longitude: number;
    };
    startLocation: {
        placeId?: string | undefined;
        name: string;
        latitude: number;
        longitude: number;
    };
    durationMinutes: number;
    organizerName: string;
    createdByUid: string;
    isSharedWithPublic: boolean | undefined;
    isSharedWithFriends: boolean | undefined;
    sharedWithFriendIds: string[] | undefined;
    startedAt: import("../utils/firebase").Timestamp | undefined;
    createdAt: import("../utils/firebase").Timestamp | undefined;
    updatedAt: import("../utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    id: undefined;
    date: undefined;
    active: undefined;
    rsvpdUserIds: "";
    invitedUserIds: "";
    currentLocation: {
        name: undefined;
        placeId: undefined;
        latitude: undefined;
        longitude: undefined;
    };
    startLocation: {
        name: undefined;
        placeId: undefined;
        latitude: undefined;
        longitude: undefined;
    };
    durationMinutes: undefined;
    organizerName: undefined;
    createdByUid: undefined;
    isSharedWithPublic: undefined;
    isSharedWithFriends: undefined;
    sharedWithFriendIds: "";
    startedAt: undefined;
    createdAt: undefined;
    updatedAt: undefined;
}, "">;
export type Pair = yup.InferType<typeof pairSchema>;
export type Round = yup.InferType<typeof roundSchema>;
