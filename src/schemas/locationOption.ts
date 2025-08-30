import * as yup from "yup";
import { objectOf } from "../utils/objectOf";
import { locationSchema } from "./location";

export const locationOptionSchema = yup.object({
  location: locationSchema.required(),
  votes: objectOf(yup.boolean().required()),
});
