"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkBaseSchema = exports.roundSchema = exports.pairSchema = void 0;
const yup = __importStar(require("yup"));
const location_1 = require("../location");
const timestamp_1 = require("../utils/timestamp");
exports.pairSchema = yup.object({
    userUids: yup.array().of(yup.string().required()).required(),
    color: yup.string().required(),
    emoji: yup.string().required(),
    isTriple: yup.boolean().optional(),
});
exports.roundSchema = yup.object({
    walkId: yup.string().required(),
    roundNumber: yup.number().required().integer().min(1),
    startTime: timestamp_1.timestampSchema,
    endTime: timestamp_1.timestampSchema.optional(),
    pairs: yup.array().of(exports.pairSchema.required()).required(),
});
exports.walkBaseSchema = yup.object({
    id: yup.string(),
    date: timestamp_1.timestampSchema.required(),
    active: yup.boolean().required(),
    rsvpdUserIds: yup.array().of(yup.string().required()),
    invitedUserIds: yup.array().of(yup.string().required()),
    currentLocation: location_1.locationSchema,
    meetupLocation: location_1.locationSchema,
    durationMinutes: yup.number().required().positive().integer(),
    organizerName: yup.string().required(),
    createdByUid: yup.string().required(),
    invitationCode: yup.string().required(),
    createdAt: timestamp_1.timestampSchema,
    updatedAt: timestamp_1.timestampSchema,
});
