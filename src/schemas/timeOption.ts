import * as yup from "yup";
import { objectOf } from "../utils/objectOf";
import { timestampSchema } from "./utils/timestamp";

export const timeOptionSchema = yup.object({
  time: timestampSchema.required(),
  votes: objectOf(yup.boolean().required()),
});
