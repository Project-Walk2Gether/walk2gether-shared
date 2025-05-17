import * as yup from "yup";

export const QuoteSchema = yup.object().shape({
  text: yup.string().required("Quote text is required"),
  author: yup.string().nullable(),
  category: yup.string().nullable(),
  createdAt: yup.date().nullable(),
  updatedAt: yup.date().nullable(),
});

export type Quote = yup.InferType<typeof QuoteSchema>;
