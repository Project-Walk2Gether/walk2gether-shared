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
export const timestampSchema = yup
  .mixed<Timestamp>()
  .test("is-timestamp", "${path} must be a valid timestamp", (value) => {
    if (value === null || value === undefined) {
      return true;
    }

    // Check if it's a Timestamp-like object
    return (
      (value &&
        typeof value === "object" &&
        "toDate" in value &&
        typeof value.toDate === "function") ||
      value instanceof Date ||
      (typeof value === "object" &&
        "seconds" in value &&
        "nanoseconds" in value)
    );
  });
