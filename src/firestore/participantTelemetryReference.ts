/**
 * Firestore reference helpers for participant telemetry documents.
 *
 * Telemetry is stored as a single document per participant at:
 *   walks/{walkId}/participants/{participantId}/telemetry/current
 *
 * This isolates high-frequency location/route writes from the participant
 * document, preventing write contention that cascades to the walk document.
 */

/**
 * Get the path to a participant's telemetry document
 * @param walkId - The walk document ID
 * @param participantId - The participant document ID
 * @returns Firestore document path string
 */
export function getParticipantTelemetryDocPath(
  walkId: string,
  participantId: string,
): string {
  return `walks/${walkId}/participants/${participantId}/telemetry/current`;
}

/**
 * Get the path to the telemetry subcollection for a participant
 * @param walkId - The walk document ID
 * @param participantId - The participant document ID
 * @returns Firestore collection path string
 */
export function getParticipantTelemetryCollectionPath(
  walkId: string,
  participantId: string,
): string {
  return `walks/${walkId}/participants/${participantId}/telemetry`;
}
