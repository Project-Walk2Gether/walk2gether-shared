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
        location: {
            placeId?: string | undefined;
            name: string;
            latitude: number;
            longitude: number;
        };
        durationMinutes: number;
        organizerName: string;
        createdByUid: string;
        invitationCode: string;
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
        location: {
            name: undefined;
            placeId: undefined;
            latitude: undefined;
            longitude: undefined;
        };
        durationMinutes: undefined;
        organizerName: undefined;
        createdByUid: undefined;
        invitationCode: undefined;
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
        location: {
            placeId?: string | undefined;
            name: string;
            latitude: number;
            longitude: number;
        };
        durationMinutes: number;
        organizerName: string;
        createdByUid: string;
        invitationCode: string;
        createdAt: import("../utils/firebase").Timestamp | undefined;
        updatedAt: import("../utils/firebase").Timestamp | undefined;
        type: "neighborhood" | undefined;
    }, yup.AnyObject, {
        id: undefined;
        date: undefined;
        active: undefined;
        rsvpdUserIds: "";
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
        invitationCode: undefined;
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
    rsvpdUserIds?: string[] | undefined;
    invitedUserIds?: string[] | undefined;
    invitedPhoneNumbers?: string[] | undefined;
    location: {
        placeId?: string | undefined;
        name: string;
        latitude: number;
        longitude: number;
    };
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
    durationMinutes: number;
    organizerName: string;
    createdByUid: string;
    invitationCode: string;
} | {
    type?: "neighborhood" | undefined;
    id?: string | undefined;
    createdAt?: import("../utils/firebase").Timestamp | undefined;
    updatedAt?: import("../utils/firebase").Timestamp | undefined;
    rsvpdUserIds?: string[] | undefined;
    invitedUserIds?: string[] | undefined;
    location: {
        placeId?: string | undefined;
        name: string;
        latitude: number;
        longitude: number;
    };
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
    durationMinutes: number;
    organizerName: string;
    createdByUid: string;
    invitationCode: string;
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
