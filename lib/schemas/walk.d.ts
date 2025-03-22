import * as yup from "yup";
export declare const pairSchema: yup.ObjectSchema<{
    id: string;
    users: string[];
    color: string;
    number: number;
    isTriple: boolean | undefined;
}, yup.AnyObject, {
    id: undefined;
    users: "";
    color: undefined;
    number: undefined;
    isTriple: undefined;
}, "">;
export declare const roundSchema: yup.ObjectSchema<{
    id: string;
    walkId: string;
    roundNumber: number;
    startTime: import("./utils/firebase").Timestamp | undefined;
    endTime: import("./utils/firebase").Timestamp | undefined;
    pairs: {
        isTriple?: boolean | undefined;
        number: number;
        id: string;
        users: string[];
        color: string;
    }[];
}, yup.AnyObject, {
    id: undefined;
    walkId: undefined;
    roundNumber: undefined;
    startTime: undefined;
    endTime: undefined;
    pairs: "";
}, "">;
export declare const walkSchema: yup.ObjectSchema<{
    id: string;
    date: import("./utils/firebase").Timestamp;
    active: NonNullable<boolean | undefined>;
    rsvpUsers: string[] | undefined;
    checkedInUsers: string[] | undefined;
    theme: string | undefined;
    location: {
        name: string;
        placeId: string;
        latitude: number;
        longitude: number;
    } | undefined;
    durationMinutes: number;
    numberOfRotations: number;
    rounds: {
        startTime?: import("./utils/firebase").Timestamp | undefined;
        endTime?: import("./utils/firebase").Timestamp | undefined;
        id: string;
        walkId: string;
        roundNumber: number;
        pairs: {
            isTriple?: boolean | undefined;
            number: number;
            id: string;
            users: string[];
            color: string;
        }[];
    }[];
    organizer: string | undefined;
    createdByUid: string;
    createdAt: import("./utils/firebase").Timestamp | undefined;
    updatedAt: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    id: undefined;
    date: undefined;
    active: undefined;
    rsvpUsers: "";
    checkedInUsers: "";
    theme: undefined;
    location: {
        name: undefined;
        placeId: undefined;
        latitude: undefined;
        longitude: undefined;
    };
    durationMinutes: undefined;
    numberOfRotations: undefined;
    rounds: "";
    organizer: undefined;
    createdByUid: undefined;
    createdAt: undefined;
    updatedAt: undefined;
}, "">;
export type Pair = yup.InferType<typeof pairSchema>;
export type Round = yup.InferType<typeof roundSchema>;
export type Walk = yup.InferType<typeof walkSchema>;
