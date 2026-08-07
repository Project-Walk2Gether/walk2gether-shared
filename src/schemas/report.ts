import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

// Top-level `reports/{id}` collection. Created client-side whenever a user
// flags content or blocks another user (App Store Guideline 1.2). Reports are
// triaged in the admin app and must be actioned within 24 hours: remove the
// offending content and, for serious/repeat offences, eject the user.

export const REPORT_CONTENT_TYPES = [
  "message",
  "photo",
  "profile",
  "walk",
  "group",
  "user",
] as const;

export type ReportContentType = (typeof REPORT_CONTENT_TYPES)[number];

export const REPORT_REASONS = [
  "spam",
  "harassment_or_bullying",
  "inappropriate_content",
  "violence_or_threats",
  "impersonation",
  "other",
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number];

export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  spam: "Spam",
  harassment_or_bullying: "Harassment or bullying",
  inappropriate_content: "Inappropriate content",
  violence_or_threats: "Violence or threats",
  impersonation: "Impersonation",
  other: "Other",
};

export const REPORT_STATUS_OPTIONS = [
  "pending",
  "resolved",
  "dismissed",
] as const;

export type ReportStatus = (typeof REPORT_STATUS_OPTIONS)[number];

// How the report came to exist: an explicit flag, or as a side effect of the
// reporter blocking the target user (blocks always notify the developer).
export const REPORT_SOURCES = ["flag", "block"] as const;

export type ReportSource = (typeof REPORT_SOURCES)[number];

export const reportSchema = yup.object({
  id: yup.string(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  reporterUid: yup.string().required(),
  reporterName: yup.string().optional(),
  // The user who authored the reported content / is being blocked
  targetUid: yup.string().required(),
  targetName: yup.string().optional(),
  contentType: yup.mixed<ReportContentType>().oneOf(REPORT_CONTENT_TYPES).required(),
  // Firestore document path (e.g. walks/x/messages/y) or Storage path of the
  // reported content; null when reporting a user rather than specific content.
  contentPath: yup.string().nullable().default(null),
  // Snapshot of the offending content at report time (message text, image
  // URL, profile text) so moderators can act even if it is later edited.
  contentPreview: yup.string().nullable().default(null),
  reason: yup.mixed<ReportReason>().oneOf(REPORT_REASONS).required(),
  details: yup.string().nullable().default(null),
  source: yup.mixed<ReportSource>().oneOf(REPORT_SOURCES).required().default("flag"),
  status: yup
    .mixed<ReportStatus>()
    .oneOf(REPORT_STATUS_OPTIONS)
    .required()
    .default("pending"),
  resolvedAt: timestampSchema.optional().nullable(),
  resolvedByUid: yup.string().optional().nullable(),
  resolutionNotes: yup.string().optional().nullable(),
  // Set by the onReportCreated trigger once the developer has been emailed
  notifiedAt: timestampSchema.optional().nullable(),
});

export type Report = yup.InferType<typeof reportSchema>;
