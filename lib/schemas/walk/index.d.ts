import * as yup from "yup";
import { FriendGroupWalk } from "./friendGroupWalk";
import { FriendWalk } from "./friendWalk";
import { NeighborhoodWalk } from "./neighborhoodWalk";
export * from "./friendGroupWalk";
export * from "./friendWalk";
export * from "./neighborhoodWalk";
export declare const walkSchemas: {
    friend: yup.ObjectSchema<{
        date: import("../utils/firebase").Timestamp;
        active: NonNullable<boolean | undefined>;
        rsvpdUserIds: string[] | undefined;
        checkedInUserIds: string[] | undefined;
        invitedUserIds: string[] | undefined;
        location: {
            name: string;
            placeId: string;
            latitude: number;
            longitude: number;
        };
        durationMinutes: number;
        organizerName: string;
        createdByUid: string;
        createdAt: import("../utils/firebase").Timestamp | undefined;
        updatedAt: import("../utils/firebase").Timestamp | undefined;
        type: "friend" | undefined;
    }, yup.AnyObject, {
        date: undefined;
        active: undefined;
        rsvpdUserIds: "";
        checkedInUserIds: "";
        invitedUserIds: "";
        location: {
            name: undefined;
            placeId: undefined;
            latitude: undefined;
            longitude: undefined;
        };
        durationMinutes: undefined;
        organizerName: undefined;
        createdByUid: undefined;
        createdAt: undefined;
        updatedAt: undefined;
        type: undefined;
    }, "">;
    friendGroup: yup.ObjectSchema<{
        date: import("../utils/firebase").Timestamp;
        active: NonNullable<boolean | undefined>;
        rsvpdUserIds: string[] | undefined;
        checkedInUserIds: string[] | undefined;
        invitedUserIds: string[] | undefined;
        location: {
            name: string;
            placeId: string;
            latitude: number;
            longitude: number;
        };
        durationMinutes: number;
        organizerName: string;
        createdByUid: string;
        createdAt: import("../utils/firebase").Timestamp | undefined;
        updatedAt: import("../utils/firebase").Timestamp | undefined;
        type: "friendGroup" | undefined;
    }, yup.AnyObject, {
        date: undefined;
        active: undefined;
        rsvpdUserIds: "";
        checkedInUserIds: "";
        invitedUserIds: "";
        location: {
            name: undefined;
            placeId: undefined;
            latitude: undefined;
            longitude: undefined;
        };
        durationMinutes: undefined;
        organizerName: undefined;
        createdByUid: undefined;
        createdAt: undefined;
        updatedAt: undefined;
        type: undefined;
    }, "">;
    neighborhood: yup.ObjectSchema<{
        date: import("../utils/firebase").Timestamp;
        active: NonNullable<boolean | undefined>;
        rsvpdUserIds: string[] | undefined;
        checkedInUserIds: string[] | undefined;
        invitedUserIds: string[] | undefined;
        location: {
            name: string;
            placeId: string;
            latitude: number;
            longitude: number;
        };
        durationMinutes: number;
        organizerName: string;
        createdByUid: string;
        createdAt: import("../utils/firebase").Timestamp | undefined;
        updatedAt: import("../utils/firebase").Timestamp | undefined;
        type: "neighborhood" | undefined;
        minimumNumberOfMinutesWithEachPartner: number;
        rounds: {
            startTime?: import("../utils/firebase").Timestamp | undefined;
            endTime?: import("../utils/firebase").Timestamp | undefined;
            walkId: string;
            roundNumber: number;
            pairs: {
                isTriple?: boolean | undefined;
                userUids: string[];
                color: string;
                emoji: string;
            }[];
        }[];
    }, yup.AnyObject, {
        date: undefined;
        active: undefined;
        rsvpdUserIds: "";
        checkedInUserIds: "";
        invitedUserIds: "";
        location: {
            name: undefined;
            placeId: undefined;
            latitude: undefined;
            longitude: undefined;
        };
        durationMinutes: undefined;
        organizerName: undefined;
        createdByUid: undefined;
        createdAt: undefined;
        updatedAt: undefined;
        type: undefined;
        minimumNumberOfMinutesWithEachPartner: 5;
        rounds: "";
    }, "">;
};
export declare const walkSchema: yup.Lazy<{
    createdAt?: import("../utils/firebase").Timestamp | undefined;
    updatedAt?: import("../utils/firebase").Timestamp | undefined;
    type?: "friendGroup" | undefined;
    rsvpdUserIds?: string[] | undefined;
    checkedInUserIds?: string[] | undefined;
    invitedUserIds?: string[] | undefined;
    location: {
        name: string;
        placeId: string;
        latitude: number;
        longitude: number;
    };
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
    durationMinutes: number;
    organizerName: string;
    createdByUid: string;
} | {
    createdAt?: import("../utils/firebase").Timestamp | undefined;
    updatedAt?: import("../utils/firebase").Timestamp | undefined;
    type?: "friend" | undefined;
    rsvpdUserIds?: string[] | undefined;
    checkedInUserIds?: string[] | undefined;
    invitedUserIds?: string[] | undefined;
    location: {
        name: string;
        placeId: string;
        latitude: number;
        longitude: number;
    };
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
    durationMinutes: number;
    organizerName: string;
    createdByUid: string;
} | {
    createdAt?: import("../utils/firebase").Timestamp | undefined;
    updatedAt?: import("../utils/firebase").Timestamp | undefined;
    type?: "neighborhood" | undefined;
    rsvpdUserIds?: string[] | undefined;
    checkedInUserIds?: string[] | undefined;
    invitedUserIds?: string[] | undefined;
    location: {
        name: string;
        placeId: string;
        latitude: number;
        longitude: number;
    };
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
    durationMinutes: number;
    organizerName: string;
    createdByUid: string;
    minimumNumberOfMinutesWithEachPartner: number;
    rounds: {
        startTime?: import("../utils/firebase").Timestamp | undefined;
        endTime?: import("../utils/firebase").Timestamp | undefined;
        walkId: string;
        roundNumber: number;
        pairs: {
            isTriple?: boolean | undefined;
            userUids: string[];
            color: string;
            emoji: string;
        }[];
    }[];
} | {
    type: string;
}, yup.AnyObject, any>;
export declare const walkIsFriendWalk: (value: Walk) => value is FriendWalk;
export declare const isValidFriendWalk: (value: unknown) => value is FriendWalk;
export declare const walkIsFriendGroupWalk: (value: Walk) => value is FriendGroupWalk;
export declare const isValidFriendGroupWalk: (value: unknown) => value is FriendGroupWalk;
export declare const walkIsNeighborhoodWalk: (value: Walk) => value is NeighborhoodWalk;
export declare const isValidNeighborhoodWalk: (value: unknown) => value is NeighborhoodWalk;
export type Walk = FriendWalk | NeighborhoodWalk | FriendGroupWalk;
