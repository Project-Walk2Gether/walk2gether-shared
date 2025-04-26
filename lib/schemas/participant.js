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
exports.participantSchema = exports.routeSchema = exports.routeDurationSchema = exports.routeDistanceSchema = exports.routePointSchema = void 0;
const yup = __importStar(require("yup"));
const timestamp_1 = require("./utils/timestamp");
// Schema for route points (used in directions)
exports.routePointSchema = yup.object({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
});
// Schema for route distance
exports.routeDistanceSchema = yup.object({
    text: yup.string().required(), // Human-readable distance (e.g., "3.2 mi")
    value: yup.number().required(), // Distance in meters
});
// Schema for route duration
exports.routeDurationSchema = yup.object({
    text: yup.string().required(), // Human-readable duration (e.g., "10 mins")
    value: yup.number().required(), // Duration in seconds
});
// Schema for route details
exports.routeSchema = yup.object({
    points: yup.array().of(exports.routePointSchema).required(),
    distance: exports.routeDistanceSchema.required(),
    duration: exports.routeDurationSchema.required(),
    calculatedAt: timestamp_1.timestampSchema,
});
exports.participantSchema = yup.object({
    id: yup.string(),
    userUid: yup.string().required(),
    displayName: yup.string().required(),
    photoURL: yup.string().nullable(),
    lastLocation: yup.object({
        latitude: yup.number().required(),
        longitude: yup.number().required(),
        timestamp: timestamp_1.timestampSchema,
    }),
    route: exports.routeSchema.nullable(),
    status: yup
        .mixed()
        .oneOf(["pending", "on-the-way", "arrived"])
        .required(),
    // Add navigation method for route calculation
    navigationMethod: yup
        .mixed()
        .oneOf(["driving", "walking"])
        .default("walking"),
    approvedAt: timestamp_1.timestampSchema.nullable(),
    rejectedAt: timestamp_1.timestampSchema,
    createdAt: timestamp_1.timestampSchema,
    updatedAt: timestamp_1.timestampSchema,
});
