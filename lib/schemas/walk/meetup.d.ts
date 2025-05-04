import * as yup from "yup";
export declare const meetupWalkSchema: yup.ObjectSchema<{
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
    isPublic: boolean | undefined;
    sharedWithFriendIds: string[] | undefined;
    startedAt: import("../utils/firebase").Timestamp | undefined;
    createdAt: import("../utils/firebase").Timestamp | undefined;
    updatedAt: import("../utils/firebase").Timestamp | undefined;
    type: "meetup" | undefined;
    topic: string;
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
    isPublic: undefined;
    sharedWithFriendIds: "";
    startedAt: undefined;
    createdAt: undefined;
    updatedAt: undefined;
    type: undefined;
    topic: undefined;
    minimumNumberOfMinutesWithEachPartner: 5;
    rounds: "";
}, "">;
export type MeetupWalk = yup.InferType<typeof meetupWalkSchema>;
