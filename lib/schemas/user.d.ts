import * as yup from 'yup';
export declare const userSchema: yup.ObjectSchema<{
    id: string;
    name: string;
    age: NonNullable<"Younger" | "Older" | undefined>;
    location: string;
    email: string;
    isAdmin: boolean | undefined;
    profilePicUrl: string | undefined;
    aboutMe: string | undefined;
    fcmToken: string | undefined;
}, yup.AnyObject, {
    id: undefined;
    name: undefined;
    age: undefined;
    location: undefined;
    email: undefined;
    isAdmin: undefined;
    profilePicUrl: undefined;
    aboutMe: undefined;
    fcmToken: undefined;
}, "">;
