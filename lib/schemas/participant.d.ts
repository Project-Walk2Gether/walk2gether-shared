import * as yup from "yup";
export declare const participantSchema: yup.ObjectSchema<{
    userUids: string[];
    displayName: string;
    photoURL: string | undefined;
    lastLocation: {} | undefined;
    createdAt: import("./utils/firebase").Timestamp | undefined;
    updatedAt: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    userUids: "";
    displayName: undefined;
    photoURL: undefined;
    lastLocation: {};
    createdAt: undefined;
    updatedAt: undefined;
}, "">;
export type Participant = yup.InferType<typeof participantSchema>;
