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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidNewUserWalkInvitation = exports.invitationIsNewUserWalkInvitation = exports.isValidExistingUserWalkInvitation = exports.invitationIsExistingUserWalkInvitation = exports.invitationSchema = exports.invitationSchemas = void 0;
const yup = __importStar(require("yup"));
const existingUserInvitation_1 = require("./existingUserInvitation");
const friendRequestInvitation_1 = require("./friendRequestInvitation");
const newUserInvitation_1 = require("./newUserInvitation");
__exportStar(require("./existingUserInvitation"), exports);
__exportStar(require("./friendRequestInvitation"), exports);
__exportStar(require("./newUserInvitation"), exports);
// Map of walk types to their schemas
exports.invitationSchemas = {
    existingUserWalk: existingUserInvitation_1.existingUserWalkInvitationSchema,
    newUserWalk: newUserInvitation_1.newUserWalkInvitationSchema,
    friendRequest: friendRequestInvitation_1.friendRequestInvitationSchema,
};
// Dynamic schema that selects the appropriate schema based on the walk type
exports.invitationSchema = yup.lazy((value) => {
    if (typeof value?.type === "string" && value.type in exports.invitationSchemas) {
        return exports.invitationSchemas[value.type];
    }
    // Fallback schema for validation when type is missing or invalid
    return yup.object({
        type: yup
            .string()
            .oneOf(Object.keys(exports.invitationSchemas))
            .required("Invitation type is required"),
    });
});
// Type guard functions
const invitationIsExistingUserWalkInvitation = (value) => value.type === "existingUserWalk";
exports.invitationIsExistingUserWalkInvitation = invitationIsExistingUserWalkInvitation;
const isValidExistingUserWalkInvitation = (value) => {
    try {
        existingUserInvitation_1.existingUserWalkInvitationSchema.validateSync(value);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidExistingUserWalkInvitation = isValidExistingUserWalkInvitation;
const invitationIsNewUserWalkInvitation = (value) => value.type === "newUserWalk";
exports.invitationIsNewUserWalkInvitation = invitationIsNewUserWalkInvitation;
const isValidNewUserWalkInvitation = (value) => {
    try {
        newUserInvitation_1.newUserWalkInvitationSchema.validateSync(value);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidNewUserWalkInvitation = isValidNewUserWalkInvitation;
