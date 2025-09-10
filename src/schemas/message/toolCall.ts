// Payload for logging tool calls within the conversation stream
import * as yup from "yup";
import { roleSchema } from "./role";
import { timestampSchema } from "../utils/timestamp";

export const toolCallSchema = yup.object({
  name: yup.string().required(),
  role: roleSchema.required(),
  args: yup.mixed().optional(),
  result: yup.mixed().optional(),
  status: yup
    .mixed<"started" | "success" | "error">()
    .oneOf(["started", "success", "error"])
    .optional(),
  errorMessage: yup.string().optional(),
  startedAt: timestampSchema.optional(),
  completedAt: timestampSchema.optional(),
});
