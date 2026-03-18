export function getLocationOptionTelemetryDocPath(
  walkId: string,
  locationOptionId: string,
): string {
  return `walks/${walkId}/locationOptions/${locationOptionId}/telemetry/current`;
}

export function getLocationOptionTelemetryCollectionPath(
  walkId: string,
  locationOptionId: string,
): string {
  return `walks/${walkId}/locationOptions/${locationOptionId}/telemetry`;
}
