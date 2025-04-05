"use strict";
/**
 * Firebase Types
 *
 * Platform-agnostic type definitions for Firebase Firestore
 * These types can be used by both React Native and Node.js Firebase implementations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSnapshotLike = void 0;
class DocumentSnapshotLike {
    constructor(exists, ref, id, _data) {
        this.exists = exists;
        this.ref = ref;
        this.id = id;
        this._data = _data;
    }
    data() {
        return this._data;
    }
    get(fieldPath) {
        return null;
    }
    isEqual(other) {
        return this.id === other.id && this.ref.path === other.ref.path;
    }
}
exports.DocumentSnapshotLike = DocumentSnapshotLike;
