import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const QuoteSchema = yup.object().shape({
  id: yup.string(),
  text: yup.string().required("Quote text is required"),
  author: yup.string().nullable(),
  category: yup.string().nullable(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Quote = yup.InferType<typeof QuoteSchema>;
