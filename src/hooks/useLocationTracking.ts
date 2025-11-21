import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

interface LocationCoords {
  latitude: number;
  longitude: number;
  timestamp: any;
  timestampIso?: any;
}

interface UseLocationTrackingOptions {
  enabled: boolean;
  onLocationUpdate: (location: LocationCoords) => void;
  onError?: (error: Error) => void;
  distanceInterval?: number; // Minimum distance (meters) between updates
  timeInterval?: number; // Minimum time (ms) between updates
  accuracy?: Location.Accuracy;
}

export const useLocationTracking = (options: UseLocationTrackingOptions) => {
  const {
    enabled,
    onLocationUpdate,
    onError,
    distanceInterval = 10, // 10 meters minimum distance
    timeInterval = 5000, // 5 seconds minimum time
    accuracy = Location.Accuracy.Balanced,
  } = options;

  const onLocationUpdateRef = useRef(onLocationUpdate);
  useEffect(() => {
    onLocationUpdateRef.current = onLocationUpdate;
  }, [onLocationUpdate]);

  const [permissionStatus, setPermissionStatus] =
    useState<Location.PermissionStatus | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const lastUpdateTimeRef = useRef<number>(0);
  const lastLocationRef = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371e3; // Earth's radius in meters
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    },
    []
  );

  // Check if location should be updated based on distance and time
  const shouldUpdateLocation = useCallback(
    (latitude: number, longitude: number): boolean => {
      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdateTimeRef.current;

      // Check time interval
      if (timeSinceLastUpdate < timeInterval) {
        return false;
      }

      // Check distance if we have a previous location
      if (lastLocationRef.current) {
        const distance = calculateDistance(
          lastLocationRef.current.latitude,
          lastLocationRef.current.longitude,
          latitude,
          longitude
        );

        if (distance < distanceInterval) {
          return false;
        }
      }

      return true;
    },
    [calculateDistance, distanceInterval, timeInterval]
  );

  // Request location permissions
  const requestPermissions = useCallback(async () => {
    try {
      const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (foregroundStatus !== "granted") {
        const error = new Error("Location permission not granted");
        onError?.(error);
        setPermissionStatus(foregroundStatus);
        return false;
      }

      // Request background permissions for iOS and Android
      if (Platform.OS !== "web") {
        await Location.requestBackgroundPermissionsAsync();
      }

      setPermissionStatus(foregroundStatus);
      return true;
    } catch (error) {
      console.error("[Location] Permission error:", error);
      onError?.(error as Error);
      return false;
    }
  }, [onError]);

  // Emit location update (helper function)
  const emitLocationUpdate = useCallback(
    (latitude: number, longitude: number) => {
      const locationData: LocationCoords = {
        latitude,
        longitude,
        timestamp: Date.now(),
        timestampIso: new Date().toISOString(),
      };

      // Update refs
      lastUpdateTimeRef.current = Date.now();
      lastLocationRef.current = { latitude, longitude };

      // Callback with latest location handler
      if (onLocationUpdateRef.current) {
        onLocationUpdateRef.current(locationData);
      }
    },
    []
  );

  // Start location tracking
  const startTracking = useCallback(async () => {
    // Prevent duplicate calls
    if (isTracking || subscriptionRef.current || intervalRef.current) {
      return;
    }

    try {
      // Check permissions first
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        return;
      }

      // Get initial location
      const initialLocation = await Location.getCurrentPositionAsync({
        accuracy,
      });
      const { latitude, longitude } = initialLocation.coords;
      lastLocationRef.current = { latitude, longitude };

      // Emit initial location immediately
      emitLocationUpdate(latitude, longitude);

      // Start watching location to keep lastLocationRef updated
      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy,
          timeInterval: 1000, // Check location every second
          distanceInterval: 0, // No distance filter - we want all updates
          mayShowUserSettingsDialog: true,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          // Update last known location (but don't emit yet - timer will handle that)
          lastLocationRef.current = { latitude, longitude };
        }
      );

      // Set up interval to emit location every timeInterval milliseconds
      // This ensures we emit even if location hasn't changed
      intervalRef.current = setInterval(() => {
        if (lastLocationRef.current) {
          emitLocationUpdate(
            lastLocationRef.current.latitude,
            lastLocationRef.current.longitude
          );
        }
      }, timeInterval);

      setIsTracking(true);
    } catch (error) {
      console.error("[Location] Error starting tracking:", error);
      onError?.(error as Error);
      setIsTracking(false);
    }
  }, [
    isTracking,
    requestPermissions,
    accuracy,
    timeInterval,
    emitLocationUpdate,
    onError,
  ]);

  // Stop location tracking
  const stopTracking = useCallback(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
      subscriptionRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsTracking(false);
    lastUpdateTimeRef.current = 0;
    lastLocationRef.current = null;
  }, []);

  // Handle enabled state changes
  useEffect(() => {
    if (enabled) {
      startTracking();
    } else {
      stopTracking();
    }

    // Cleanup when component unmounts
    return () => {
      stopTracking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]); // Only depend on enabled, not the functions

  return {
    isTracking,
    permissionStatus,
    startTracking,
    stopTracking,
  };
};
