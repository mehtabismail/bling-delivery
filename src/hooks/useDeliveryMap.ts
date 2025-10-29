import Constants from "expo-constants";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

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
export const useDeliveryMap = () => {
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
  const blingCenterLocation: Coordinates = {
    latitude: 37.7849, // Canyon Park area (from image)
    longitude: -122.4194,
  };

  const buyerLocation: Coordinates = {
    latitude: 37.8249, // North destination (from image)
    longitude: -122.3794,
  };

  // Google Maps API Key
  const GOOGLE_MAPS_API_KEY =
    Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY || "";

  /**
   * Requests location permission and gets current location
   */
  const requestLocationPermission = useCallback(async () => {
    try {
      setIsLoadingLocation(true);

      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.warn("Location permission not granted");
        setIsLoadingLocation(false);
        return;
      }

      // Get current location with high accuracy
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords: Coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setCurrentLocation(coords);

      // Calculate initial map region to fit all markers
      calculateMapRegion(coords);

      // Get route from current location to Bling Center to Buyer
      await getRouteCoordinates(coords);

      setIsLoadingLocation(false);
    } catch (error) {
      console.error("Error getting location:", error);
      setIsLoadingLocation(false);
    }
  }, []);

  /**
   * Calculates map region to fit all markers
   */
  const calculateMapRegion = useCallback(
    (currentLoc: Coordinates) => {
      const allLatitudes = [
        currentLoc.latitude,
        blingCenterLocation.latitude,
        buyerLocation.latitude,
      ];
      const allLongitudes = [
        currentLoc.longitude,
        blingCenterLocation.longitude,
        buyerLocation.longitude,
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
    [blingCenterLocation, buyerLocation]
  );

  /**
   * Gets route coordinates from Google Directions API
   * Route: Current Location → Bling Center → Buyer Location
   */
  const getRouteCoordinates = useCallback(
    async (currentLoc: Coordinates) => {
      if (!GOOGLE_MAPS_API_KEY) {
        console.warn("Google Maps API Key not configured");
        return;
      }

      try {
        // Get route: Current Location → Bling Center → Buyer Location
        const origin = `${currentLoc.latitude},${currentLoc.longitude}`;
        const destination = `${buyerLocation.latitude},${buyerLocation.longitude}`;
        const waypoints = `${blingCenterLocation.latitude},${blingCenterLocation.longitude}`;

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${GOOGLE_MAPS_API_KEY}`
        );

        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const points = decodePolyline(
            data.routes[0].overview_polyline.points
          );
          setRouteCoordinates(points);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    },
    [GOOGLE_MAPS_API_KEY, blingCenterLocation, buyerLocation]
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
    requestLocationPermission();
  }, [requestLocationPermission]);

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
    requestLocationPermission,
  };
};
