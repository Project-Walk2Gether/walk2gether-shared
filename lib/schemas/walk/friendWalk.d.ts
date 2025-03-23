import * as yup from "yup";
export declare const friendWalkSchema: yup.ObjectSchema<{
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
    type: "friend" | undefined;
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
    type: undefined;
}, "">;
export type FriendWalk = yup.InferType<typeof friendWalkSchema>;
