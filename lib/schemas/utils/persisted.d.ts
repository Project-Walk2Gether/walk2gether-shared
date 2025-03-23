import { Timestamp } from "./firebase";
export type Persisted<T> = T & {
    id: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};
