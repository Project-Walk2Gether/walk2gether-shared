import * as yup from "yup";
import { ObjectSchema } from "yup";
import { DocumentReferenceLike } from "./documentReference";
type WithMaybeId = {
    id?: string | undefined;
};
export declare const withId: (schema: ObjectSchema<yup.AnyObject, unknown>) => yup.ObjectSchema<{
    [x: string]: any;
    _ref: DocumentReferenceLike<unknown> | undefined;
    id: string;
}, unknown, any, "">;
export type WithId<T extends WithMaybeId> = T & {
    id: string;
    _ref: DocumentReferenceLike<T>;
};
export {};
