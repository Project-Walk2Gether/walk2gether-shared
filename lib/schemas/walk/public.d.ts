import * as yup from "yup";
export declare const publicWalkSchema: yup.ObjectSchema<{
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
    type: "public" | undefined;
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
export type PublicWalk = yup.InferType<typeof publicWalkSchema>;
