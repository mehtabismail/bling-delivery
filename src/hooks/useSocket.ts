import { BASE_URL } from "@/src/config/env";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface UseSocketOptions {
  enabled: boolean;
  authToken?: string | null;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export const useSocket = (options: UseSocketOptions) => {
  const { enabled, authToken, onConnect, onDisconnect, onError } = options;
  const socketRef = useRef<Socket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Get socket endpoint
  const getSocketUrl = useCallback(() => {
    // Extract base server URL (remove /api if present)
    let baseUrl = BASE_URL;

    // Remove /api suffix if it exists (for REST API)
    if (baseUrl.endsWith("/api")) {
      baseUrl = baseUrl.slice(0, -4);
    } else if (baseUrl.endsWith("/api/")) {
      baseUrl = baseUrl.slice(0, -5);
    }

    // Remove trailing slash
    baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

    // Return base URL - namespace will be added by Socket.io
    return baseUrl;
  }, []);

  // Get socket namespace
  const getSocketNamespace = useCallback(() => {
    // Namespace should start with / (backend uses /rider namespace)
    return "/rider";
  }, []);

  // Emit location update
  const emitLocation = useCallback(
    (locationData: LocationData) => {
      if (socketRef.current && socketRef.current.connected) {
        try {
          socketRef.current.emit("rider:location:update", locationData);
          console.log("[Socket] 📍 Location emitted:", {
            lat: locationData.latitude.toFixed(6),
            lng: locationData.longitude.toFixed(6),
            timestamp: locationData.timestamp,
          });
        } catch (error) {
          onError?.(error as Error);
        }
      }
    },
    [onError]
  );

  // Connect socket
  const connect = useCallback(() => {
    if (socketRef.current?.connected) {
      return;
    }

    try {
      const socketUrl = getSocketUrl();
      const namespace = getSocketNamespace();
      const fullSocketUrl = `${socketUrl}${namespace}`;

      // Build socket options with authentication
      const socketOptions: any = {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        timeout: 10000,
      };

      // Add authentication if token is available
      if (authToken) {
        socketOptions.auth = {
          token: authToken,
        };
        socketOptions.extraHeaders = {
          Authorization: `Bearer ${authToken}`,
        };
      }

      // Connect to the namespace
      socketRef.current = io(fullSocketUrl, socketOptions);

      socketRef.current.on("connect", () => {
        setIsConnected(true);
        onConnect?.();
      });

      socketRef.current.on("disconnect", (reason) => {
        setIsConnected(false);
        onDisconnect?.();
      });

      const logConnectionError = (error: Error) => {
        setIsConnected(false);
        onError?.(error);
      };

      socketRef.current.on("connect_error", (error) => {
        logConnectionError(error);
      });

      socketRef.current.on("error", (error) => {
        logConnectionError(error);
      });
    } catch (error) {
      console.error("[Socket] Error creating socket:", error);
      onError?.(error as Error);
    }
  }, [getSocketUrl, authToken, onConnect, onDisconnect, onError]);

  // Disconnect socket
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // Handle enabled state changes
  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]); // Only depend on enabled, not the functions

  return {
    socket: socketRef.current,
    isConnected,
    emitLocation,
    connect,
    disconnect,
  };
};
