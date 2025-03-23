import * as yup from "yup";
import { FriendGroupWalk } from "./friendGroupWalk";
import { FriendWalk } from "./friendWalk";
import { NeighborhoodWalk } from "./neighborhoodWalk";
export * from "./friendGroupWalk";
export * from "./friendWalk";
export * from "./neighborhoodWalk";
export declare const walkSchemas: {
    friend: yup.ObjectSchema<{
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
        type: "friend" | undefined;
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
    }, "">;
    friendGroup: yup.ObjectSchema<{
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
        type: "friendGroup" | undefined;
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
    }, "">;
    neighborhood: yup.ObjectSchema<{
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
        minimumNumberOfMinutesWithEachPartner: number;
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
        minimumNumberOfMinutesWithEachPartner: 5;
        rounds: "";
    }, "">;
};
export declare const walkSchema: yup.Lazy<{
    type?: "friendGroup" | undefined;
    createdAt?: import("../utils/firebase").Timestamp | undefined;
    updatedAt?: import("../utils/firebase").Timestamp | undefined;
    rsvpUsers?: string[] | undefined;
    checkedInUsers?: string[] | undefined;
    invitedUserIds?: string[] | undefined;
    id: string;
    location: {
        name: string;
        placeId: string;
        latitude: number;
        longitude: number;
    };
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
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
} | {
    type?: "friend" | undefined;
    createdAt?: import("../utils/firebase").Timestamp | undefined;
    updatedAt?: import("../utils/firebase").Timestamp | undefined;
    rsvpUsers?: string[] | undefined;
    checkedInUsers?: string[] | undefined;
    invitedUserIds?: string[] | undefined;
    id: string;
    location: {
        name: string;
        placeId: string;
        latitude: number;
        longitude: number;
    };
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
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
} | {
    type?: "neighborhood" | undefined;
    createdAt?: import("../utils/firebase").Timestamp | undefined;
    updatedAt?: import("../utils/firebase").Timestamp | undefined;
    rsvpUsers?: string[] | undefined;
    checkedInUsers?: string[] | undefined;
    invitedUserIds?: string[] | undefined;
    id: string;
    location: {
        name: string;
        placeId: string;
        latitude: number;
        longitude: number;
    };
    date: import("../utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
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
    minimumNumberOfMinutesWithEachPartner: number;
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
