import * as yup from "yup";

export const systemUpdateSeveritySchema = yup
  .string()
  .oneOf(["normal", "severe"])
  .required();

export type SystemUpdateSeverity = yup.InferType<
  typeof systemUpdateSeveritySchema
>;

export const systemUpdateSchema = yup.object({
  severity: systemUpdateSeveritySchema,
  nativeAppVersion: yup.string().optional(),
  // Sequential patch number within nativeAppVersion (1, 2, 3...), assigned at
  // publish time. Resets for each new native app version.
  patchNumber: yup.number().integer().positive().optional(),
  createdAt: yup.mixed().required(),
  updatedAt: yup.mixed().nullable(),
});

export type SystemUpdate = yup.InferType<typeof systemUpdateSchema>;
