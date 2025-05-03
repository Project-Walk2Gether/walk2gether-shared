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
exports.friendshipSchema = void 0;
const yup = __importStar(require("yup"));
const objectOf_1 = require("../utils/objectOf");
const userData_1 = require("./userData");
const timestamp_1 = require("./utils/timestamp");
exports.friendshipSchema = yup.object({
    id: yup.string(),
    uids: yup
        .array()
        .of(yup.string().required())
        .required()
        .min(2, "A friendship must have at least 2 users")
        .max(2, "A friendship cannot have more than 2 users")
        .test("unique-uids", "User IDs must be unique in a friendship", (uids) => {
        if (!uids)
            return true;
        const uniqueUids = [...new Set(uids)];
        return uniqueUids.length === uids.length;
    })
        .test("different-users", "Cannot create a friendship with yourself", (uids) => {
        if (!uids || uids.length !== 2)
            return true;
        return uids[0] !== uids[1];
    }),
    userDataByUid: (0, objectOf_1.objectOf)(userData_1.userDataSchema),
    createdAt: timestamp_1.timestampSchema,
    updatedAt: timestamp_1.timestampSchema,
    createdByUid: yup.string().required(),
    acceptedAt: timestamp_1.timestampSchema,
    deletedAt: timestamp_1.timestampSchema.nullable().defined(),
    deletedByUid: yup.string().optional(),
    reportedAt: timestamp_1.timestampSchema,
    reportedByUid: yup.string().optional(),
    reportReason: yup.string().optional(),
    lastMessageAt: timestamp_1.timestampSchema,
});
