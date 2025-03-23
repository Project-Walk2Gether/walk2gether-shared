import * as yup from "yup";
export declare const neighborhoodWalkSchema: yup.ObjectSchema<{
    id: string;
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
    rsvpUsers: string[] | undefined;
    checkedInUsers: string[] | undefined;
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
    type: "neighborhood" | undefined;
    numberOfRotations: number;
    rounds: {
        startTime?: import("../utils/firebase").Timestamp | undefined;
        endTime?: import("../utils/firebase").Timestamp | undefined;
        id: string;
        walkId: string;
        roundNumber: number;
        pairs: {
            isTriple?: boolean | undefined;
            id: string;
            users: string[];
            color: string;
            emoji: string;
        }[];
    }[];
}, yup.AnyObject, {
    id: undefined;
    date: undefined;
    active: undefined;
    rsvpUsers: "";
    checkedInUsers: "";
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
    numberOfRotations: undefined;
    rounds: "";
}, "">;
export type NeighborhoodWalk = yup.InferType<typeof neighborhoodWalkSchema>;
