import * as yup from "yup";
import { timestampSchema } from "./utils/timestamp";

/**
 * One finalized utterance from a human in a walk room, transcribed per speaker
 * by the voice agent ONLY while every person present has opted in to Jottie
 * relationship memory. Lives at walks/{walkId}/rooms/{roomId}/memoryTranscript.
 * Server-only (no client rules); deleted once memories are extracted.
 */
export const memoryTranscriptItemSchema = yup.object({
  speakerUid: yup.string().required(),
  text: yup.string().required(),
  ts: timestampSchema.required(),
  /**
   * Who heard this line: the canonical (unique, sorted — see
   * canonicalParticipantUids) uids of every human present, all opted in,
   * while capture was active for the WHOLE utterance. Someone who joined or
   * left mid-utterance is not included. Extraction scopes the memories drawn
   * from a line to exactly this set, so a late joiner never inherits what was
   * said before they arrived (and a leaver never inherits what came after).
   *
   * Optional for back-compat: lines written before this field existed fall
   * back to the room's memoryCaptureUids.
   */
  presentUids: yup.array().of(yup.string().required()).optional(),
});

export type MemoryTranscriptItem = yup.InferType<typeof memoryTranscriptItemSchema>;
