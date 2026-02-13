import { Room } from "./room";

/**
 * Strongly-typed metadata attached to every LiveKit room.
 *
 * "waiting" rooms carry the full set of paths so the voice-agent can
 * look up the participant and walk documents.
 * "pair" and "main" rooms only need the walkId.
 */
export interface LivekitRoomMetadata {
  roomType: Room["type"];
  walkId: string;
  walkDocPath: string;
  roomDocPath: string;
  createdAt: string; // ISO timestamp
}
