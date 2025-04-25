import * as yup from "yup";
export declare const userDataSchema: yup.ObjectSchema<{
    id: string | undefined;
    name: string;
    location: {
        placeId?: string | undefined;
        name: string;
        latitude: number;
        longitude: number;
    } | undefined;
    profilePicUrl: string | undefined;
    friendInvitationCode: string;
    expoPushToken: string | null | undefined;
    deviceInfo: any;
    aboutMe: string | undefined;
}, yup.AnyObject, {
    id: undefined;
    name: undefined;
    location: {
        name: undefined;
        placeId: undefined;
        latitude: undefined;
        longitude: undefined;
    };
    profilePicUrl: undefined;
    friendInvitationCode: undefined;
    expoPushToken: undefined;
    deviceInfo: undefined;
    aboutMe: undefined;
}, "">;
export type UserData = yup.InferType<typeof userDataSchema>;
