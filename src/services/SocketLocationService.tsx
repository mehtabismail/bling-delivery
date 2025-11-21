import { useGoLive } from "@/src/contexts/GoLiveContext";
import { useLocationTracking } from "@/src/hooks/useLocationTracking";
import { useSocket } from "@/src/hooks/useSocket";
import { RootState } from "@/src/store/store";
import { showToast } from "@/src/utils/toast";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface LocationCoords {
  latitude: number;
  longitude: number;
  timestamp: string;
}

/**
 * SocketLocationService Component
 * Manages socket connection and location tracking based on Go Live status
 * This component should be mounted at the app level to work across all screens
 */
export const SocketLocationService: React.FC = () => {
  const { isGoLive } = useGoLive();
  const [locationQueue, setLocationQueue] = useState<LocationCoords[]>([]);
  const isGoLiveRef = useRef(isGoLive);

  useEffect(() => {
    isGoLiveRef.current = isGoLive;
  }, [isGoLive]);

  // Get auth token from Redux store
  const authToken = useSelector((state: RootState) => state.auth.token);

  // Socket connection handlers
  const handleSocketConnect = useCallback(() => {
    showToast({
      type: "success",
      text1: "Connected",
      text2: "You are now live and sharing your location",
    });

    // Send any queued locations
    if (locationQueue.length > 0) {
      setLocationQueue([]);
    }
  }, [locationQueue]);

  const handleSocketDisconnect = useCallback(() => {
    showToast({
      type: "default",
      text1: "Disconnected",
      text2: "Location sharing has stopped",
    });
  }, []);

  const handleSocketError = useCallback((error: Error) => {
    console.error("[Service] Socket error:", error);
    showToast({
      type: "error",
      text1: "Connection Error",
      text2: "Failed to connect to server",
    });
  }, []);

  // Initialize socket with authentication
  const { emitLocation, isConnected } = useSocket({
    enabled: isGoLive,
    authToken, // Pass auth token for authentication
    onConnect: handleSocketConnect,
    onDisconnect: handleSocketDisconnect,
    onError: handleSocketError,
  });

  // Location update handler
  const handleLocationUpdate = useCallback(
    (location: LocationCoords) => {
      if (isConnected) {
        emitLocation(location);
      } else {
        setLocationQueue((prev) => [...prev, location]);
      }
    },
    [isConnected, emitLocation]
  );

  const handleLocationError = useCallback((error: Error) => {
    console.error("[Service] Location error:", error);
    showToast({
      type: "error",
      text1: "Location Error",
      text2: error.message || "Failed to get location",
    });
  }, []);

  // Initialize location tracking with optimized settings
  // Backend requires location updates every 15 seconds
  const { isTracking, permissionStatus } = useLocationTracking({
    enabled: isGoLive,
    onLocationUpdate: handleLocationUpdate,
    onError: handleLocationError,
    distanceInterval: 10, // 10 meters minimum distance
    timeInterval: 5000, // 5 seconds minimum time
  });

  // Send queued locations when socket connects
  useEffect(() => {
    if (isConnected && locationQueue.length > 0) {
      locationQueue.forEach((location) => {
        emitLocation(location);
      });
      setLocationQueue([]);
    }
  }, [isConnected, locationQueue, emitLocation]);

  // Log status changes (only when Go Live state changes)
  useEffect(() => {
    if (isGoLive) {
      // Optionally log once if needed
    } else {
      // noop
    }
  }, [isGoLive]);

  // This component doesn't render anything
  return null;
};

export default SocketLocationService;
