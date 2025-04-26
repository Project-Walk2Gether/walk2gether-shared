import * as yup from "yup";
export declare const routePointSchema: yup.ObjectSchema<{
    latitude: number;
    longitude: number;
}, yup.AnyObject, {
    latitude: undefined;
    longitude: undefined;
}, "">;
export declare const routeDistanceSchema: yup.ObjectSchema<{
    text: string;
    value: number;
}, yup.AnyObject, {
    text: undefined;
    value: undefined;
}, "">;
export declare const routeDurationSchema: yup.ObjectSchema<{
    text: string;
    value: number;
}, yup.AnyObject, {
    text: undefined;
    value: undefined;
}, "">;
export declare const routeSchema: yup.ObjectSchema<{
    points: {
        latitude: number;
        longitude: number;
    }[];
    distance: {
        text: string;
        value: number;
    };
    duration: {
        text: string;
        value: number;
    };
    calculatedAt: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    points: "";
    distance: {
        text: undefined;
        value: undefined;
    };
    duration: {
        text: undefined;
        value: undefined;
    };
    calculatedAt: undefined;
}, "">;
export type RoutePoint = yup.InferType<typeof routePointSchema>;
export type RouteDistance = yup.InferType<typeof routeDistanceSchema>;
export type RouteDuration = yup.InferType<typeof routeDurationSchema>;
export type Route = yup.InferType<typeof routeSchema>;
export declare const participantSchema: yup.ObjectSchema<{
    id: string | undefined;
    userUid: string;
    displayName: string;
    photoURL: string | null | undefined;
    lastLocation: {
        timestamp?: import("./utils/firebase").Timestamp | undefined;
        latitude: number;
        longitude: number;
    };
    route: {
        calculatedAt?: import("./utils/firebase").Timestamp | undefined;
        points: {
            latitude: number;
            longitude: number;
        }[];
        distance: {
            text: string;
            value: number;
        };
        duration: {
            text: string;
            value: number;
        };
    } | null;
    status: NonNullable<"pending" | "on-the-way" | "arrived" | undefined>;
    navigationMethod: "driving" | "walking";
    approvedAt: import("./utils/firebase").Timestamp | null | undefined;
    rejectedAt: import("./utils/firebase").Timestamp | undefined;
    createdAt: import("./utils/firebase").Timestamp | undefined;
    updatedAt: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    id: undefined;
    userUid: undefined;
    displayName: undefined;
    photoURL: undefined;
    lastLocation: {
        latitude: undefined;
        longitude: undefined;
        timestamp: undefined;
    };
    route: {
        points: "";
        distance: {
            text: undefined;
            value: undefined;
        };
        duration: {
            text: undefined;
            value: undefined;
        };
        calculatedAt: undefined;
    };
    status: undefined;
    navigationMethod: "walking";
    approvedAt: undefined;
    rejectedAt: undefined;
    createdAt: undefined;
    updatedAt: undefined;
}, "">;
export type Participant = yup.InferType<typeof participantSchema>;
export type ParticipantWithRoute = Participant & {
    route: Route | null;
};
