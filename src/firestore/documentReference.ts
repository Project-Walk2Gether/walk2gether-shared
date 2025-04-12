import * as yup from "yup";
import { DocumentSnapshotLike } from "../types/firebase";

// Ultimately, we have a problem because our "core" types include references to firestore
// constructs, such as snapshots and documents, however, they can either be firebase-admin or
// standard firebase objects. The mismatch in type definitions between firebase and firebase-admin
// prevent us from importing either or both libraries into our core package, and using those
// official type definitions. Instead, we use loose duck-typing for now, and in some cases, resort
// to using any types. We do this for now because our core library isn't really used in this regard
// - to derive correct firestore types through our schema and other core objects. Instead, we just
// provide basic ducktypes to prevent type errors. We should probably come back to this in future so
// our types are correct.
export interface DocumentReferenceLike<T> {
  id: string;
  path: string;
  get(): Promise<DocumentSnapshotLike<T>>;
  collection: (collectionPath: string) => any; // any for now
  parent: any;
  update(...args: any): Promise<any>;
  delete(): Promise<any>;
}

export const documentReferenceSchema = yup
  .mixed<DocumentReferenceLike<unknown>>()
  .test({
    name: "has-id-property",
    message: '${path} must be an object with an "id" property',
    test: (value) =>
      value == null ||
      (typeof value === "object" &&
        "id" in value &&
        typeof value.id === "string"),
  });

export const collectionReferenceSchema = yup.mixed();
