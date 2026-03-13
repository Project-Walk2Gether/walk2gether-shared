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
  createdAt: yup.mixed().required(),
  updatedAt: yup.mixed().nullable(),
});

export type SystemUpdate = yup.InferType<typeof systemUpdateSchema>;
