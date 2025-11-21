import Constants from "expo-constants";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

import { DirectionsResponse } from "@/src/types/shipments";

/**
 * Coordinates interface
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Route coordinates for map polyline
 */
export interface RouteCoordinates {
  latitude: number;
  longitude: number;
}

const DEFAULT_BLING_CENTER: Coordinates = {
  latitude: 37.7849,
  longitude: -122.4194,
};

const DEFAULT_BUYER_LOCATION: Coordinates = {
  latitude: 37.8249,
  longitude: -122.3794,
};

/**
 * Custom Hook for Delivery Map with Live Tracking
 *
 * This hook provides:
 * - Current location detection and tracking
 * - Route calculation between current location → Bling Center → Buyer location
 * - Map region management
 * - Loading states
 *
 * @returns Object containing map data and functions
 */
export const useDeliveryMap = (
  directions?: DirectionsResponse["data"] | null
) => {
  // State management
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(
    null
  );
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);
  const [routeCoordinates, setRouteCoordinates] = useState<RouteCoordinates[]>(
    []
  );
  const [mapRegion, setMapRegion] = useState<any>(null);

  // Mock coordinates (replace with dynamic data later)
  const [blingCenterLocation, setBlingCenterLocation] =
    useState<Coordinates>(DEFAULT_BLING_CENTER);
  const [buyerLocation, setBuyerLocation] = useState<Coordinates>(
    DEFAULT_BUYER_LOCATION
  );

  // Google Maps API Key
  const GOOGLE_MAPS_API_KEY =
    Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY || "";

  /**
   * Calculates map region to fit all markers
   */
  const calculateMapRegion = useCallback(
    (currentLoc: Coordinates, pickup: Coordinates, drop: Coordinates) => {
      const allLatitudes = [
        currentLoc.latitude,
        pickup.latitude,
        drop.latitude,
      ];
      const allLongitudes = [
        currentLoc.longitude,
        pickup.longitude,
        drop.longitude,
      ];

      const minLat = Math.min(...allLatitudes);
      const maxLat = Math.max(...allLatitudes);
      const minLng = Math.min(...allLongitudes);
      const maxLng = Math.max(...allLongitudes);

      const midLat = (minLat + maxLat) / 2;
      const midLng = (minLng + maxLng) / 2;
      const deltaLat = (maxLat - minLat) * 1.5; // Add padding
      const deltaLng = (maxLng - minLng) * 1.5;

      setMapRegion({
        latitude: midLat,
        longitude: midLng,
        latitudeDelta: Math.max(deltaLat, 0.05),
        longitudeDelta: Math.max(deltaLng, 0.05),
      });
    },
    []
  );

  /**
   * Gets route coordinates from Google Directions API
   * Route: Current Location → Bling Center → Buyer Location
   */
  const getRouteCoordinates = useCallback(
    async (
      currentLoc: Coordinates,
      directionsData: DirectionsResponse["data"] | null | undefined,
      pickup: Coordinates,
      drop: Coordinates
    ) => {
      if (directionsData?.polyline) {
        const decoded = decodePolyline(directionsData.polyline);
        setRouteCoordinates(decoded);
        return;
      }

      console.log("=== ROUTE CALCULATION ===");
      console.log("Current Location:", currentLoc);
      console.log("Pickup (blingCenter):", pickup);
      console.log("Drop (buyer):", drop);
      console.log("Has Backend Polyline:", !!directionsData?.polyline);
      console.log(
        "Backend fromLat/Lng:",
        directionsData?.fromLatitude,
        directionsData?.fromLongitude
      );
      console.log(
        "Backend toLat/Lng:",
        directionsData?.toLatitude,
        directionsData?.toLongitude
      );
      console.log("Has Google API Key:", !!GOOGLE_MAPS_API_KEY);

      if (!GOOGLE_MAPS_API_KEY) {
        console.warn("Google Maps API Key not configured");
        setRouteCoordinates([
          { latitude: currentLoc.latitude, longitude: currentLoc.longitude },
          { latitude: drop.latitude, longitude: drop.longitude },
        ]);
        return;
      }

      try {
        let encodedPoints: string | null = null;

        // Try using backend coordinates first
        if (directionsData?.fromLatitude && directionsData?.toLatitude) {
          const origin = `${directionsData.fromLatitude},${directionsData.fromLongitude}`;
          const destination = `${directionsData.toLatitude},${directionsData.toLongitude}`;

          console.log("Fetching route from backend coordinates:");
          console.log("  Origin:", origin);
          console.log("  Destination:", destination);

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          console.log("Google API Status (backend coords):", data.status);

          if (data.status === "OK") {
            encodedPoints = data.routes?.[0]?.overview_polyline?.points ?? null;
            console.log(
              "Got polyline from backend coords, length:",
              encodedPoints?.length || 0
            );
          } else {
            console.log("Google API Error:", data.error_message || data.status);
          }
        }

        // Fallback to current location -> drop if backend coords fail
        if (!encodedPoints) {
          const origin = `${currentLoc.latitude},${currentLoc.longitude}`;
          const destination = `${drop.latitude},${drop.longitude}`;

          console.log("Fetching route from current location to drop:");
          console.log("  Origin (current):", origin);
          console.log("  Destination (drop):", destination);

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`
          );

          const data = await response.json();
          console.log("Google API Status (fallback):", data.status);

          if (data.status === "OK") {
            encodedPoints = data.routes?.[0]?.overview_polyline?.points ?? null;
            console.log(
              "Got polyline from fallback, length:",
              encodedPoints?.length || 0
            );
          } else {
            console.log("Google API Error:", data.error_message || data.status);
          }
        }

        if (encodedPoints) {
          const decoded = decodePolyline(encodedPoints);
          console.log("Decoded polyline points count:", decoded.length);
          setRouteCoordinates(decoded);
        } else {
          console.log("⚠️ No polyline available, using straight line fallback");
          setRouteCoordinates([
            { latitude: currentLoc.latitude, longitude: currentLoc.longitude },
            { latitude: drop.latitude, longitude: drop.longitude },
          ]);
        }
        console.log("========================");
      } catch (error) {
        console.error("❌ Error fetching route:", error);
        setRouteCoordinates([
          { latitude: currentLoc.latitude, longitude: currentLoc.longitude },
          { latitude: drop.latitude, longitude: drop.longitude },
        ]);
      }
    },
    [GOOGLE_MAPS_API_KEY]
  );

  /**
   * Decodes Google polyline format to coordinates array
   */
  const decodePolyline = (encoded: string): RouteCoordinates[] => {
    const poly: RouteCoordinates[] = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let b;
      let shift = 0;
      let result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      poly.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return poly;
  };

  /**
   * Starts watching location for live tracking
   */
  const startLocationTracking = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      // Watch location changes
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 10, // Or when moved 10 meters
        },
        (location) => {
          const newCoords: Coordinates = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setCurrentLocation(newCoords);
        }
      );
    } catch (error) {
      console.error("Error starting location tracking:", error);
    }
  }, []);

  // Request location on mount
  useEffect(() => {
    let isMounted = true;

    const initLocation = async () => {
      try {
        setIsLoadingLocation(true);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (!isMounted) return;

        if (status !== "granted") {
          console.warn("Location permission not granted");
          setIsLoadingLocation(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        if (!isMounted) return;

        const coords: Coordinates = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setCurrentLocation(coords);

        calculateMapRegion(coords, blingCenterLocation, buyerLocation);

        await getRouteCoordinates(
          coords,
          directions,
          blingCenterLocation,
          buyerLocation
        );

        if (isMounted) {
          setIsLoadingLocation(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
        }
      }
    };

    initLocation();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map data when directions change
  useEffect(() => {
    if (directions) {
      const fromLocation: Coordinates = {
        latitude: directions.fromLatitude ?? DEFAULT_BLING_CENTER.latitude,
        longitude: directions.fromLongitude ?? DEFAULT_BLING_CENTER.longitude,
      };
      const toLocation: Coordinates = {
        latitude: directions.toLatitude ?? DEFAULT_BUYER_LOCATION.latitude,
        longitude: directions.toLongitude ?? DEFAULT_BUYER_LOCATION.longitude,
      };

      setBlingCenterLocation(fromLocation);
      setBuyerLocation(toLocation);

      if (directions.polyline) {
        setRouteCoordinates(decodePolyline(directions.polyline));
      }

      if (currentLocation) {
        calculateMapRegion(currentLocation, fromLocation, toLocation);
        getRouteCoordinates(
          currentLocation,
          directions,
          fromLocation,
          toLocation
        );
      }
    } else {
      setBlingCenterLocation(DEFAULT_BLING_CENTER);
      setBuyerLocation(DEFAULT_BUYER_LOCATION);
    }
  }, [directions, currentLocation, calculateMapRegion, getRouteCoordinates]);

  // Recalculate region when current location updates
  useEffect(() => {
    if (currentLocation) {
      calculateMapRegion(currentLocation, blingCenterLocation, buyerLocation);
      getRouteCoordinates(
        currentLocation,
        directions,
        blingCenterLocation,
        buyerLocation
      );
    }
  }, [
    currentLocation,
    calculateMapRegion,
    getRouteCoordinates,
    directions,
    blingCenterLocation,
    buyerLocation,
  ]);

  return {
    // State
    currentLocation,
    blingCenterLocation,
    buyerLocation,
    mapRegion,
    routeCoordinates,
    isLoadingLocation,

    // Actions
    startLocationTracking,
  };
};
