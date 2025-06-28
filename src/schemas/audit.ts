import * as yup from "yup";

/**
 * Schema for audit log entries tracking document changes
 */
export const auditSchema = yup.object({
  // Metadata
  collectionName: yup.string().required(),
  documentId: yup.string().required(),
  timestamp: yup.date().required(),
  userId: yup.string().nullable(), // User who made the change, if available
  operation: yup.string().oneOf(["create", "update", "delete"]).required(),
  
  // Change data
  dataBefore: yup.mixed().nullable(), // Document data before change
  dataAfter: yup.mixed().nullable(),  // Document data after change
  
  // For filtering/reporting
  fieldsChanged: yup.array().of(yup.string()).nullable(),
}).required();

export type Audit = yup.InferType<typeof auditSchema>;
