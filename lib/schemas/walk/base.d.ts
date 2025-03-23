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
    id: string;
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
    organizer: {
        userData: {
            isAdmin?: boolean | undefined;
            profilePicUrl?: string | undefined;
            aboutMe?: string | undefined;
            fcmToken?: string | undefined;
            name: string;
            id: string;
            age: NonNullable<"Younger" | "Older" | undefined>;
            location: string;
            email: string;
        };
        uid: string;
    };
    createdAt: import("../utils/firebase").Timestamp | undefined;
    updatedAt: import("../utils/firebase").Timestamp | undefined;
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
    organizer: {
        uid: undefined;
        userData: {
            id: undefined;
            name: undefined;
            age: undefined;
            location: undefined;
            email: undefined;
            isAdmin: undefined;
            profilePicUrl: undefined;
            aboutMe: undefined;
            fcmToken: undefined;
        };
    };
    createdAt: undefined;
    updatedAt: undefined;
}, "">;
export type Pair = yup.InferType<typeof pairSchema>;
export type Round = yup.InferType<typeof roundSchema>;
