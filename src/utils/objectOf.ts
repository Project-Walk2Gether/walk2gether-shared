import { mapValues } from "lodash";
import * as yup from "yup";

export function objectOf<T extends yup.Schema | yup.Lazy<unknown>>(schema: T) {
  return yup.lazy((obj) => {
    const shape: Record<string, T> = mapValues(
      obj as Record<string, unknown>,
      () => schema
    );
    return yup.object(shape).required();
  });
}

export function optionalObjectOf<T extends yup.Schema | yup.Lazy<unknown>>(
  schema: T
) {
  return yup.lazy((obj) => {
    const shape: Record<string, T> = mapValues(
      obj as Record<string, unknown>,
      () => schema
    );
    return yup.object(shape).notRequired();
  });
}
