import * as yup from "yup";

/**
 * Status of an individual E2E test case.
 */
export const e2eTestStatusSchema = yup
  .string()
  .oneOf(["passed", "failed", "skipped", "pending"])
  .required();

export type E2ETestStatus = yup.InferType<typeof e2eTestStatusSchema>;

/**
 * A single step within an E2E test.
 */
export const e2eTestStepSchema = yup.object({
  /** Human-readable step description */
  name: yup.string().required(),
  /** ms offset from start of test recording */
  startOffsetMs: yup.number().required(),
  /** ms offset from start of test recording */
  endOffsetMs: yup.number().required(),
  /** Duration of this step in ms */
  durationMs: yup.number().required(),
  /** Whether this step passed or failed */
  status: yup.string().oneOf(["passed", "failed"]).required(),
  /** Error message if the step failed */
  errorMessage: yup.string().nullable().default(null),
});

export type E2ETestStep = yup.InferType<typeof e2eTestStepSchema>;

/**
 * A single E2E test case tracked across runs.
 * Stored in `e2eTestCases/{testId}`.
 *
 * The testId is a stable hash of `suiteName + testName` so the same
 * logical test always maps to the same document.
 */
export const e2eTestCaseSchema = yup.object({
  /** Stable ID derived from suite + test name */
  id: yup.string().required(),
  /** Describe block name */
  suiteName: yup.string().required(),
  /** It block name */
  testName: yup.string().required(),
  /** Full title: "suiteName > testName" */
  fullName: yup.string().required(),
  /** Current status from most recent run */
  status: e2eTestStatusSchema,
  /** Previous status (to detect transitions) */
  previousStatus: e2eTestStatusSchema.nullable().default(null),
  /** Duration in ms of the most recent run */
  durationMs: yup.number().nullable().default(null),
  /** Error message if the most recent run failed */
  errorMessage: yup.string().nullable().default(null),
  /** Firebase Storage URL of the most recent video recording */
  videoUrl: yup.string().url().nullable().default(null),
  /** Firebase Storage URL of the failure screenshot */
  screenshotUrl: yup.string().url().nullable().default(null),
  /** Ordered list of steps recorded during the most recent run */
  steps: yup.array().of(e2eTestStepSchema).nullable().default(null),
  /** ID of the run that last updated this test case */
  lastRunId: yup.string().nullable().default(null),
  /** When this test case was first seen */
  createdAt: yup.date().required(),
  /** When this test case was last updated */
  updatedAt: yup.date().required(),
});

export type E2ETestCase = yup.InferType<typeof e2eTestCaseSchema>;

/**
 * Summary of a full E2E test run (one invocation of `detox test`).
 * Stored in `e2eTestRuns/{runId}`.
 */
export const e2eTestRunSchema = yup.object({
  id: yup.string().required(),
  /** Timestamp when the run started */
  startedAt: yup.date().required(),
  /** Timestamp when the run finished */
  finishedAt: yup.date().required(),
  /** Total duration in ms */
  durationMs: yup.number().required(),
  /** Count of passed tests */
  passed: yup.number().required().min(0).integer(),
  /** Count of failed tests */
  failed: yup.number().required().min(0).integer(),
  /** Count of skipped tests */
  skipped: yup.number().required().min(0).integer(),
  /** Total test count */
  total: yup.number().required().min(0).integer(),
  /** Overall run status */
  status: yup.string().oneOf(["passed", "failed"]).required(),
  /** Device/simulator used */
  device: yup.string().nullable().default(null),
  /** Detox configuration name (e.g. "ios.sim.debug") */
  configuration: yup.string().nullable().default(null),
  /** Git branch at time of run */
  gitBranch: yup.string().nullable().default(null),
  /** Git commit SHA at time of run */
  gitCommit: yup.string().nullable().default(null),
});

export type E2ETestRun = yup.InferType<typeof e2eTestRunSchema>;

/**
 * Individual test result within a run.
 * Stored in `e2eTestRuns/{runId}/results/{testId}`.
 */
export const e2eTestResultSchema = yup.object({
  testId: yup.string().required(),
  suiteName: yup.string().required(),
  testName: yup.string().required(),
  fullName: yup.string().required(),
  status: e2eTestStatusSchema,
  durationMs: yup.number().nullable().default(null),
  errorMessage: yup.string().nullable().default(null),
});

export type E2ETestResult = yup.InferType<typeof e2eTestResultSchema>;
