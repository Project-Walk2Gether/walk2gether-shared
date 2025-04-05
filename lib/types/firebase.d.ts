/**
 * Firebase Types
 *
 * Platform-agnostic type definitions for Firebase Firestore
 * These types can be used by both React Native and Node.js Firebase implementations
 */
/**
 * Generic Timestamp interface that matches Firebase's Timestamp structure
 * This is compatible with both @react-native-firebase/firestore and firebase-admin
 */
export interface Timestamp {
    seconds: number;
    nanoseconds: number;
    toDate(): Date;
    toMillis(): number;
    isEqual(other: Timestamp): boolean;
    valueOf(): string;
}
/**
 * Interface for Firestore document
 */
export interface FirestoreDocument {
    id: string;
    exists: boolean;
    data: () => any;
}
/**
 * Interface for Firestore instance
 */
export interface FirestoreInstance {
    collection: (path: string) => {
        doc: (id: string) => {
            get: () => Promise<FirestoreDocument>;
            set: (data: any, options?: {
                merge?: boolean;
            }) => Promise<any>;
            update: (data: any) => Promise<any>;
        };
    };
    runTransaction: <T>(updateFunction: (transaction: any) => Promise<T>) => Promise<T>;
    batch: () => {
        set: (ref: any, data: any, options?: {
            merge?: boolean;
        }) => any;
        update: (ref: any, data: any) => any;
        commit: () => Promise<any>;
    };
}
export declare class DocumentSnapshotLike<T> {
    readonly exists: boolean;
    readonly ref: any;
    readonly id: string;
    private _data?;
    constructor(exists: boolean, ref: any, id: string, _data?: T | undefined);
    data(): T | undefined;
    get(fieldPath: any): any;
    isEqual(other: DocumentSnapshotLike<T>): boolean;
}
