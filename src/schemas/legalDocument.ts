import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

export const legalDocumentSectionSchema = yup.object({
  heading: yup.string().required(),
  body: yup.string().required(),
});

export type LegalDocumentSection = yup.InferType<
  typeof legalDocumentSectionSchema
>;

export const legalDocumentSchema = yup.object({
  id: yup.string(),
  // e.g. "privacy-policy", "terms-of-service"
  slug: yup.string().required(),
  title: yup.string().required(),
  lastUpdatedLabel: yup.string().required(),
  sections: yup
    .array()
    .of(legalDocumentSectionSchema.required())
    .required()
    .default([]),
  version: yup.number().required().default(1),
  updatedAt: timestampSchema,
  updatedByUid: yup.string().nullable().default(null),
});

export type LegalDocument = yup.InferType<typeof legalDocumentSchema>;

// Version of the in-app Terms of Service (hardcoded in the expo app, unlike
// the CMS-driven privacy policy). Bump whenever the terms text changes so
// users are re-prompted to agree; stamped on userData.agreedTermsOfServiceVersion.
export const TERMS_OF_SERVICE_VERSION = 2;
