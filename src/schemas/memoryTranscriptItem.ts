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
});

export type MemoryTranscriptItem = yup.InferType<typeof memoryTranscriptItemSchema>;
