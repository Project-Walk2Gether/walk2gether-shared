export const AGENT_NAME = "Chester";

/**
 * Combine first and last name into the denormalized `name` field.
 */
export const combineName = (firstName: string, lastName: string): string =>
  [firstName, lastName].map((s) => (s || "").trim()).filter(Boolean).join(" ");

/**
 * Split a single full name into first/last parts. The first whitespace-delimited
 * token becomes the first name; everything after it is the last name. Used to
 * backfill existing single-`name` users and to seed the onboarding form from a
 * pre-existing auth displayName.
 */
export const splitName = (
  name: string | null | undefined,
): { firstName: string; lastName: string } => {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" "),
  };
};
