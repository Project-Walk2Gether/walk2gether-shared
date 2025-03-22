import * as yup from "yup";
export declare const locationSchema: yup.ObjectSchema<{
    name: string;
    placeId: string;
    latitude: number;
    longitude: number;
}, yup.AnyObject, {
    name: undefined;
    placeId: undefined;
    latitude: undefined;
    longitude: undefined;
}, "">;
export type Location = yup.InferType<typeof locationSchema>;
