import { Timestamp } from "./firebase";
export interface Participant {
    userUid: string;
    displayName: string;
    photoURL: string | null;
    lastLocation?: {
        latitude: number;
        longitude: number;
        timestamp: number;
    };
    createdAt: Timestamp | Date;
    updatedAt: Timestamp | Date;
}
