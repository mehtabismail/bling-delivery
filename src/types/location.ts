/**
 * Location Types
 * Shared type definitions for location tracking and socket communication
 */

/**
 * Location coordinates with timestamp
 */
export interface LocationCoords {
  latitude: number;
  longitude: number;
  timestamp: string;
}

/**
 * Socket connection status
 */
export type SocketStatus =
  | "connected"
  | "disconnected"
  | "connecting"
  | "error";

/**
 * Location permission status
 */
export type LocationPermissionStatus = "granted" | "denied" | "undetermined";

/**
 * Socket event types for location tracking
 */
export const SOCKET_EVENTS = {
  LOCATION_UPDATE: "location:update",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  ERROR: "error",
} as const;

/**
 * Socket emit data structure for location updates
 */
export interface LocationUpdatePayload {
  latitude: number;
  longitude: number;
  timestamp: string;
}

/**
 * Location tracking configuration
 */
export interface LocationTrackingConfig {
  distanceInterval: number; // in meters
  timeInterval: number; // in milliseconds
  enableBackgroundTracking: boolean;
}

/**
 * Default location tracking configuration
 */
export const DEFAULT_LOCATION_CONFIG: LocationTrackingConfig = {
  distanceInterval: 10, // 10 meters
  timeInterval: 5000, // 5 seconds
  enableBackgroundTracking: true,
};
