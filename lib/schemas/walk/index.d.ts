import * as yup from "yup";
import { FriendsWalk } from "./friends";
import { MeetupWalk } from "./meetup";
import { NeighborhoodWalk } from "./neighborhood";
export * from "./base";
export * from "./friends";
export * from "./neighborhood";
export declare const walkSchemas: {
    friends: yup.ObjectSchema<{
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
        type: "friends" | undefined;
        invitedPhoneNumbers: string[] | undefined;
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
        type: undefined;
        invitedPhoneNumbers: "";
    }, "">;
    neighborhood: yup.ObjectSchema<{
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
        type: "neighborhood" | undefined;
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
        type: undefined;
    }, "">;
};
export declare const walkSchema: yup.Lazy<{
    type?: "friends" | undefined;
    id?: string | undefined;
    createdAt?: import("../utils/firebase").Timestamp | undefined;
    updatedAt?: import("../utils/firebase").Timestamp | undefined;
    startedAt?: import("../utils/firebase").Timestamp | undefined;
    rsvpdUserIds?: string[] | undefined;
    invitedUserIds?: string[] | undefined;
    isSharedWithPublic?: boolean | undefined;
    isSharedWithFriends?: boolean | undefined;
    sharedWithFriendIds?: string[] | undefined;
    invitedPhoneNumbers?: string[] | undefined;
    createdByUid: string;
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
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
    durationMinutes: number;
    organizerName: string;
} | {
    type?: "neighborhood" | undefined;
    id?: string | undefined;
    createdAt?: import("../utils/firebase").Timestamp | undefined;
    updatedAt?: import("../utils/firebase").Timestamp | undefined;
    startedAt?: import("../utils/firebase").Timestamp | undefined;
    rsvpdUserIds?: string[] | undefined;
    invitedUserIds?: string[] | undefined;
    isSharedWithPublic?: boolean | undefined;
    isSharedWithFriends?: boolean | undefined;
    sharedWithFriendIds?: string[] | undefined;
    createdByUid: string;
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
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
    durationMinutes: number;
    organizerName: string;
} | {
    type: string;
}, yup.AnyObject, any>;
export declare const walkIsFriendsWalk: (value: Walk) => value is FriendsWalk;
export declare const isValidFriendsWalk: (value: unknown) => value is FriendsWalk;
export declare const walkIsNeighborhoodWalk: (value: Walk) => value is NeighborhoodWalk;
export declare const isValidNeighborhoodWalk: (value: unknown) => value is NeighborhoodWalk;
export declare const walkIsMeetupWalk: (value: Walk) => value is MeetupWalk;
export declare const isValidMeetupWalk: (value: unknown) => value is MeetupWalk;
export type Walk = FriendsWalk | NeighborhoodWalk | MeetupWalk;
