import * as yup from "yup";
import { ObjectSchema } from "yup";
import {
  DocumentReferenceLike,
  documentReferenceSchema,
} from "./documentReference";

type WithMaybeId = { id?: string | undefined };

export const withId = (schema: ObjectSchema<yup.AnyObject, unknown>) =>
  schema.shape({
    _ref: documentReferenceSchema,
    id: yup.string().required(),
  });
export type WithId<T extends WithMaybeId> = T & {
  id: string;
  _ref: DocumentReferenceLike<T>;
};
