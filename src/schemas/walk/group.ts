import * as yup from "yup";
import { walkBaseSchema } from "./base";

export const groupWalkSchema = walkBaseSchema.shape({
  type: yup.mixed<"group">().oneOf(["group"]).required(),
  topic: yup.string().required(),
  descriptionMarkdown: yup.string(),
  questionPrompts: yup.array().of(yup.string().required()),
  newMatchesPossibleForUserUids: yup
    .array()
    .of(yup.string().required())
    .optional()
    .default([]),
  roundLengthMinutes: yup.number().required().integer().min(0).default(5),
  // Track whether we've sent the first "ready" notification to the organizer
  notifiedFirstReady: yup.boolean().optional().default(false),
  // Track whether we've sent the first "connected" notification to the organizer
  notifiedFirstConnected: yup.boolean().optional().default(false),
  // Whether to show a selfie prompt before the final "all together" round
  enableFinalRoomSelfie: yup.boolean().optional().default(false),
  // Whether to reserve time for a final "all together" round at the end
  enableFinalRoom: yup.boolean().optional().default(true),
  // Target duration (in minutes) for the final round, computed at creation time
  targetFinalRoomMinutes: yup.number().optional().integer().min(0).default(0),
  // Number of pair rounds before the final round, computed at creation time.
  // The final round is created once this many rounds have completed.
  numRounds: yup.number().optional().integer().min(1),
});

export type GroupWalk = yup.InferType<typeof groupWalkSchema>;
