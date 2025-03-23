import * as yup from "yup";
export declare const userDataSchema: yup.ObjectSchema<{
    id: string;
    name: string;
    age: NonNullable<"Younger" | "Older" | undefined>;
    location: {
        name: string;
        placeId: string;
        latitude: number;
        longitude: number;
    };
    email: string;
    profilePicUrl: string | undefined;
    aboutMe: string | undefined;
}, yup.AnyObject, {
    id: undefined;
    name: undefined;
    age: undefined;
    location: {
        name: undefined;
        placeId: undefined;
        latitude: undefined;
        longitude: undefined;
    };
    email: undefined;
    profilePicUrl: undefined;
    aboutMe: undefined;
}, "">;
export type UserData = yup.InferType<typeof userDataSchema>;
