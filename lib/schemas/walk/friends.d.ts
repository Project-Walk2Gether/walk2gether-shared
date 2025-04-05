import * as yup from "yup";
export declare const friendsWalkSchema: yup.ObjectSchema<{
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
    invitationCode: string;
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
    invitationCode: undefined;
    createdAt: undefined;
    updatedAt: undefined;
    type: undefined;
}, "">;
export type FriendsWalk = yup.InferType<typeof friendsWalkSchema>;
