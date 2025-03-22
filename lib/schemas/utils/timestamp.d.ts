/**
 * Custom Yup schema for Firestore Timestamp
 *
 * This schema validates that a value is a Firestore Timestamp-like object.
 * Each consuming project (frontend/backend) should use its own Firebase implementation.
 */
import * as yup from "yup";
import { Timestamp } from "./firebase";
/**
 * Yup schema for Firestore Timestamp
 *
 * This schema accepts:
 * - Firestore Timestamp objects (from either react-native-firebase or firebase-admin)
 * - Objects with seconds and nanoseconds properties
 * - Date objects (to be converted by the consuming application)
 */
export declare const timestampSchema: yup.MixedSchema<Timestamp | undefined, yup.AnyObject, undefined, "">;
