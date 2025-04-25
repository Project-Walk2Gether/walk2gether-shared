import * as yup from "yup";
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
    status: NonNullable<"pending" | "on-the-way" | "arrived" | undefined>;
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
    status: undefined;
    approvedAt: undefined;
    rejectedAt: undefined;
    createdAt: undefined;
    updatedAt: undefined;
}, "">;
export type Participant = yup.InferType<typeof participantSchema>;
