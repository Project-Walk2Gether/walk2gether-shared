import * as yup from "yup";
export declare const favoriteLocationSchema: yup.ObjectSchema<{
    location: {
        placeId?: string | undefined;
        name: string;
        latitude: number;
        longitude: number;
    };
    useCount: number;
    lastUsed: import("./utils/firebase").Timestamp | undefined;
}, yup.AnyObject, {
    location: {
        name: undefined;
        placeId: undefined;
        latitude: undefined;
        longitude: undefined;
    };
    useCount: undefined;
    lastUsed: undefined;
}, "">;
export type FavoriteLocation = yup.InferType<typeof favoriteLocationSchema>;
