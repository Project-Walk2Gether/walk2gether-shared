import * as yup from "yup";
import { ObjectSchema } from "yup";
import {
  DocumentReferenceLike,
  documentReferenceSchema,
} from "../firestore/documentReference";
import { DocumentSnapshotLike } from "../types/firebase";

type WithMaybeId = { id?: string | undefined };

// This function modifies schema to provide both a _ref property (for a document reference) and an
// id property
export const withIdSchema = (schema: ObjectSchema<yup.AnyObject, unknown>) =>
  schema.shape({
    _ref: documentReferenceSchema,
    id: yup.string().required(),
  });
export type WithId<T extends WithMaybeId> = T & {
  id: string;
  _ref: DocumentReferenceLike<T>;
};

// This function can be called on a document snapshot, to provide an object with the document's data
// as well as the _ref and id properties.
export function withId<T extends Record<string, any>>(
  doc: DocumentSnapshotLike<T>
): WithId<T> {
  return {
    ...doc.data()!,
    _ref: doc.ref as unknown as DocumentReferenceLike<T>,
    id: doc.id,
  };
}
