import { Timestamp } from "../schemas/utils/firebase";
export type Persisted<T> = T & {
    id: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};
