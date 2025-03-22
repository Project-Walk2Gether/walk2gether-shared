import * as yup from "yup";
export declare const reminderSchema: yup.ObjectSchema<{
    id: string;
    userId: string;
    walkId: string;
    type: NonNullable<"day_before" | "hour_before" | undefined>;
    scheduledFor: import("./utils/firebase").Timestamp | undefined;
    sent: NonNullable<boolean | undefined>;
}, yup.AnyObject, {
    id: undefined;
    userId: undefined;
    walkId: undefined;
    type: undefined;
    scheduledFor: undefined;
    sent: undefined;
}, "">;
export type Reminder = yup.InferType<typeof reminderSchema>;
