import { Location } from "../schemas";
export declare function calculateDistanceInMiles(lat1: number, lon1: number, lat2: number, lon2: number): number;
export declare function isLocationNearby(location1: Location, location2: Location, maxDistanceInMiles?: number): boolean;
