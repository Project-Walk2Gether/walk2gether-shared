import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const QuoteSchema = yup.object().shape({
  text: yup.string().required("Quote text is required"),
  author: yup.string().nullable(),
  category: yup.string().nullable(),
});

export type Quote = yup.InferType<typeof QuoteSchema>;

export const QuotesCollectionSchema = yup.object().shape({
  id: yup.string(),
  quotes: yup.array().of(QuoteSchema).required(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type QuotesCollection = yup.InferType<typeof QuotesCollectionSchema>;
