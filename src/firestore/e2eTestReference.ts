/**
 * Firestore reference helpers for E2E test collections.
 */

/** Top-level collection for test case documents */
export const E2E_TEST_CASES_COLLECTION = "e2eTestCases";

/** Top-level collection for test run documents */
export const E2E_TEST_RUNS_COLLECTION = "e2eTestRuns";

/**
 * Get the path to the e2eTestCases collection
 */
export function getE2ETestCasesCollectionPath(): string {
  return E2E_TEST_CASES_COLLECTION;
}

/**
 * Get the path to a specific test case document
 */
export function getE2ETestCaseDocPath(testId: string): string {
  return `${E2E_TEST_CASES_COLLECTION}/${testId}`;
}

/**
 * Get the path to the e2eTestRuns collection
 */
export function getE2ETestRunsCollectionPath(): string {
  return E2E_TEST_RUNS_COLLECTION;
}

/**
 * Get the path to a specific test run document
 */
export function getE2ETestRunDocPath(runId: string): string {
  return `${E2E_TEST_RUNS_COLLECTION}/${runId}`;
}

/**
 * Get the path to a run's results subcollection
 */
export function getE2ETestResultsCollectionPath(runId: string): string {
  return `${E2E_TEST_RUNS_COLLECTION}/${runId}/results`;
}

/**
 * Get the path to a specific result document within a run
 */
export function getE2ETestResultDocPath(
  runId: string,
  testId: string
): string {
  return `${E2E_TEST_RUNS_COLLECTION}/${runId}/results/${testId}`;
}
