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
exports.isValidNeighborhoodWalk = exports.walkIsNeighborhoodWalk = exports.isValidFriendGroupWalk = exports.walkIsFriendGroupWalk = exports.isValidFriendWalk = exports.walkIsFriendWalk = exports.walkSchema = exports.walkSchemas = void 0;
const yup = __importStar(require("yup"));
const friendGroupWalk_1 = require("./friendGroupWalk");
const friendWalk_1 = require("./friendWalk");
const neighborhoodWalk_1 = require("./neighborhoodWalk");
__exportStar(require("./friendGroupWalk"), exports);
__exportStar(require("./friendWalk"), exports);
__exportStar(require("./neighborhoodWalk"), exports);
// Map of walk types to their schemas
exports.walkSchemas = {
    friend: friendWalk_1.friendWalkSchema,
    friendGroup: friendGroupWalk_1.friendGroupWalkSchema,
    neighborhood: neighborhoodWalk_1.neighborhoodWalkSchema,
};
// Dynamic schema that selects the appropriate schema based on the walk type
exports.walkSchema = yup.lazy((value) => {
    if (typeof value?.type === "string" && value.type in exports.walkSchemas) {
        return exports.walkSchemas[value.type];
    }
    // Fallback schema for validation when type is missing or invalid
    return yup.object({
        type: yup
            .string()
            .oneOf(Object.keys(exports.walkSchemas))
            .required("Tactic type is required"),
    });
});
const walkIsFriendWalk = (value) => value.type === "friend";
exports.walkIsFriendWalk = walkIsFriendWalk;
const isValidFriendWalk = (value) => {
    try {
        friendWalk_1.friendWalkSchema.validateSync(value);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidFriendWalk = isValidFriendWalk;
const walkIsFriendGroupWalk = (value) => value.type === "friendGroup";
exports.walkIsFriendGroupWalk = walkIsFriendGroupWalk;
const isValidFriendGroupWalk = (value) => {
    try {
        friendGroupWalk_1.friendGroupWalkSchema.validateSync(value);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidFriendGroupWalk = isValidFriendGroupWalk;
const walkIsNeighborhoodWalk = (value) => value.type === "neighborhood";
exports.walkIsNeighborhoodWalk = walkIsNeighborhoodWalk;
const isValidNeighborhoodWalk = (value) => {
    try {
        neighborhoodWalk_1.neighborhoodWalkSchema.validateSync(value);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidNeighborhoodWalk = isValidNeighborhoodWalk;
