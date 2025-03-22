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
    active: NonNullable<boolean | undefined>;
}, yup.AnyObject, {
    id: undefined;
    walkId: undefined;
    roundNumber: undefined;
    startTime: undefined;
    endTime: undefined;
    pairs: "";
    active: true;
}, "">;
