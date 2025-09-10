import * as yup from "yup";

export const roleSchema = yup
  .mixed<"user" | "assistant" | "tool" | "system">()
  .oneOf(["user", "assistant", "tool", "system"]);
