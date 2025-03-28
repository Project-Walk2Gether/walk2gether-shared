import * as yup from "yup";
import { FriendsWalk } from "./friends";
import { MeetupWalk } from "./meetup";
import { NeighborhoodWalk } from "./neighborhood";
export * from "./friends";
export * from "./neighborhood";
export declare const walkSchemas: {
    friends: yup.ObjectSchema<{
        id: string | undefined;
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
        type: "friends" | undefined;
    }, yup.AnyObject, {
        id: undefined;
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
        id: string | undefined;
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
    }, yup.AnyObject, {
        id: undefined;
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
};
export declare const walkSchema: yup.Lazy<{
    id?: string | undefined;
    createdAt?: import("../utils/firebase").Timestamp | undefined;
    updatedAt?: import("../utils/firebase").Timestamp | undefined;
    type?: "friends" | undefined;
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
    id?: string | undefined;
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
