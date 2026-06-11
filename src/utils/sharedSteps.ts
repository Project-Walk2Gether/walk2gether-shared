import { SharedSteps } from "../schemas/sharedSteps";

/**
 * Combined number of steps a pair has walked together, summed across both
 * members and all walks ("we've walked N steps together").
 *
 * @param sharedSteps The pair's sharedSteps doc (may be undefined/null when
 *   the pair has never shared a room)
 */
export const getSharedStepsTotal = (
  sharedSteps?: Pick<SharedSteps, "walks"> | null,
): number => {
  if (!sharedSteps?.walks) return 0;
  let total = 0;
  for (const entry of Object.values(sharedSteps.walks)) {
    for (const steps of Object.values(entry?.stepsWalkedByUid ?? {})) {
      if (typeof steps === "number") total += steps;
    }
  }
  return total;
};
