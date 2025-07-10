/**
 * Type definitions for the travel time check API
 */
export namespace API {
  export namespace TravelTime {
    export namespace Check {
      export interface RequestBody {
        origin: {
          latitude: number;
          longitude: number;
        };
        destination: {
          latitude: number;
          longitude: number;
        };
        walkStartTime: number; // Timestamp in milliseconds
        navigationMethod?: "driving" | "walking" | "bicycling" | "transit";
      }

      export interface ResponseBody {
        canMakeIt: boolean;
        travelTimeMinutes: number;
        arrivalTimeBeforeStart: number; // Minutes before start (negative if arriving late)
        route: {
          distance: {
            text: string;
            value: number; // meters
          };
          duration: {
            text: string;
            value: number; // seconds
          };
        };
      }
    }
  }
}
