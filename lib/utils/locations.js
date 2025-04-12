"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistanceInMiles = calculateDistanceInMiles;
exports.isLocationNearby = isLocationNearby;
// Helper function to calculate distance between two coordinates in miles
function calculateDistanceInMiles(lat1, lon1, lat2, lon2) {
    // Haversine formula
    const R = 3958.8; // Earth radius in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}
// Function to check if a location is within the specified distance of another location
function isLocationNearby(location1, location2, maxDistanceInMiles = 0.25) {
    const distance = calculateDistanceInMiles(location1.latitude, location1.longitude, location2.latitude, location2.longitude);
    return distance <= maxDistanceInMiles;
}
