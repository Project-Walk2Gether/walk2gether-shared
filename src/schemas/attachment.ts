import * as yup from "yup";

export const attachmentTypes = ["image"] as const;
export type AttachmentType = (typeof attachmentTypes)[number];

export const attachmentSchema = yup.object({
  // Basic file info
  uri: yup.string().required(),
  storagePath: yup.string().required(),
  contentType: yup.string().required(),
  sizeBytes: yup.number().optional(),

  // Type-specific metadata
  type: yup.string().oneOf(attachmentTypes).required(),

  // For any additional type-specific data
  metadata: yup.mixed().optional(),
});

// Export types
export type Attachment = yup.InferType<typeof attachmentSchema>;

// Type guard
export function isAttachment(value: unknown): value is Attachment {
  try {
    attachmentSchema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
}
