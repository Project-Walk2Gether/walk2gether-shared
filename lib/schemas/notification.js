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
exports.notificationSchema = exports.NotificationType = void 0;
const yup = __importStar(require("yup"));
const timestamp_1 = require("./utils/timestamp");
var NotificationType;
(function (NotificationType) {
    NotificationType["NEW_WALK"] = "NEW_WALK";
    NotificationType["WALK_INVITE"] = "WALK_INVITE";
    NotificationType["WALK_REMINDER"] = "WALK_REMINDER";
    NotificationType["WALK_CANCELLED"] = "WALK_CANCELLED";
    NotificationType["WALK_UPDATED"] = "WALK_UPDATED";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
exports.notificationSchema = yup.object({
    id: yup.string(),
    userId: yup.string().required(),
    type: yup.string().oneOf(Object.values(NotificationType)).required(),
    title: yup.string().required(),
    body: yup.string().required(),
    data: yup.object().required(),
    read: yup.boolean().default(false),
    sent: yup.boolean().default(false),
    createdAt: timestamp_1.timestampSchema,
    updatedAt: timestamp_1.timestampSchema,
});
