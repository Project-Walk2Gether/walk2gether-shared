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
exports.isValidMeetupWalk = exports.walkIsMeetupWalk = exports.isValidNeighborhoodWalk = exports.walkIsNeighborhoodWalk = exports.isValidFriendsWalk = exports.walkIsFriendsWalk = exports.walkSchema = exports.walkSchemas = void 0;
const yup = __importStar(require("yup"));
const friends_1 = require("./friends");
const neighborhood_1 = require("./neighborhood");
__exportStar(require("./base"), exports);
__exportStar(require("./friends"), exports);
__exportStar(require("./neighborhood"), exports);
// Map of walk types to their schemas
exports.walkSchemas = {
    friends: friends_1.friendsWalkSchema,
    neighborhood: neighborhood_1.neighborhoodWalkSchema,
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
            .required("Walk type is required"),
    });
});
const walkIsFriendsWalk = (value) => value.type === "friends";
exports.walkIsFriendsWalk = walkIsFriendsWalk;
const isValidFriendsWalk = (value) => {
    try {
        friends_1.friendsWalkSchema.validateSync(value);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidFriendsWalk = isValidFriendsWalk;
const walkIsNeighborhoodWalk = (value) => value.type === "neighborhood";
exports.walkIsNeighborhoodWalk = walkIsNeighborhoodWalk;
const isValidNeighborhoodWalk = (value) => {
    try {
        neighborhood_1.neighborhoodWalkSchema.validateSync(value);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidNeighborhoodWalk = isValidNeighborhoodWalk;
const walkIsMeetupWalk = (value) => value.type === "meetup";
exports.walkIsMeetupWalk = walkIsMeetupWalk;
const isValidMeetupWalk = (value) => {
    try {
        neighborhood_1.neighborhoodWalkSchema.validateSync(value);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidMeetupWalk = isValidMeetupWalk;
