import * as yup from "yup";
export declare const rsvpSchema: yup.ObjectSchema<{
    id: string | undefined;
    userId: string;
    walkId: string;
    timestamp: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    id: undefined;
    userId: undefined;
    walkId: undefined;
    timestamp: undefined;
}, "">;
export type RSVP = yup.InferType<typeof rsvpSchema>;
