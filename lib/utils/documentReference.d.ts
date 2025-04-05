import * as yup from "yup";
import { DocumentSnapshotLike } from "../types/firebase";
export interface DocumentReferenceLike<T> {
    id: string;
    path: string;
    get(): Promise<DocumentSnapshotLike<T>>;
    collection: (collectionPath: string) => any;
    parent: any;
    update(...args: any): Promise<any>;
    delete(): Promise<any>;
}
export declare const documentReferenceSchema: yup.MixedSchema<DocumentReferenceLike<unknown> | undefined, yup.AnyObject, undefined, "">;
export declare const collectionReferenceSchema: yup.MixedSchema<{} | undefined, yup.AnyObject, undefined, "">;
