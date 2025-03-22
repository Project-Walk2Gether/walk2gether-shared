import { InferType } from "yup";
import { locationSchema, pairSchema, reminderSchema, roundSchema, rsvpSchema, userSchema, walkSchema } from "../schemas";
export type User = InferType<typeof userSchema>;
export type Walk = InferType<typeof walkSchema>;
export type Pair = InferType<typeof pairSchema>;
export type Reminder = InferType<typeof reminderSchema>;
export type RSVP = InferType<typeof rsvpSchema>;
export type Location = InferType<typeof locationSchema>;
export type Round = InferType<typeof roundSchema>;
