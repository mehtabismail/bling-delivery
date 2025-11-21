import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import React, { useEffect, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

interface MapHeaderProps {
  currentLocation: { latitude: number; longitude: number } | null;
  blingCenterLocation: { latitude: number; longitude: number };
  buyerLocation: { latitude: number; longitude: number };
  mapRegion: any;
  routeCoordinates: { latitude: number; longitude: number }[];
  isLoadingLocation: boolean;
  bottomSheetRatio?: number; // 0..1 of screen height reserved by sheet (for padding)
  pickupLabel?: string;
  pickupDescription?: string;
  dropoffLabel?: string;
  dropoffDescription?: string;
  showPickupMarker?: boolean;
  dropoffType?: "vendor" | "warehouse" | "customer";
}

const MapHeader: React.FC<MapHeaderProps> = ({
  currentLocation,
  blingCenterLocation,
  buyerLocation,
  mapRegion,
  routeCoordinates,
  isLoadingLocation,
  bottomSheetRatio = 0.6,
  pickupLabel = "Bling Center",
  pickupDescription = "Pickup location",
  dropoffLabel = "Delivery Location",
  dropoffDescription = "Customer address",
  showPickupMarker = true,
  dropoffType = "customer",
}) => {
  const { Layout, Colors, Fonts, Images } = useTheme();
  const mapRef = useRef<MapView | null>(null);
  const screenHeight = Dimensions.get("window").height;
  const bottomPaddingPx = useMemo(
    () => Math.round(screenHeight * bottomSheetRatio),
    [screenHeight, bottomSheetRatio]
  );

  // Fit map to coordinates with bottom padding so markers/route are visible above the sheet
  useEffect(() => {
    if (!mapRef.current || !mapRegion) return;
    const coords: { latitude: number; longitude: number }[] = [];
    if (currentLocation) coords.push(currentLocation);
    coords.push(blingCenterLocation, buyerLocation);

    if (coords.length) {
      try {
        mapRef.current.fitToCoordinates(coords, {
          edgePadding: {
            top: 40,
            right: 24,
            bottom: bottomPaddingPx + 24,
            left: 24,
          },
          animated: true,
        });
      } catch {}
    }
  }, [
    currentLocation,
    blingCenterLocation,
    buyerLocation,
    bottomPaddingPx,
    mapRegion,
  ]);

  /**
   * Renders loading state while getting location
   */
  const renderLoadingState = () => (
    <View style={[StyleSheet.absoluteFillObject]}>
      <View
        style={[
          Layout.center,
          {
            position: "absolute",
            left: 0,
            right: 0,
            top: screenHeight * (1 - bottomSheetRatio) * 0.5 - 20,
          },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text
          style={[
            Fonts.POPPINS_REGULAR_14,
            { color: Colors.text_707480, marginTop: mS(10) },
          ]}
        >
          Getting your location...
        </Text>
      </View>
    </View>
  );

  /**
   * Renders map view with markers and route
   */
  const renderMapView = () => (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={mapRegion}
      region={mapRegion}
      showsUserLocation={true}
      showsMyLocationButton={false}
      showsCompass={true}
      loadingEnabled={true}
    >
      {/* Route polyline */}
      {routeCoordinates.length > 0 && (
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#1E71FF"
          strokeWidth={5}
          lineCap="round"
          lineJoin="round"
          geodesic
        />
      )}

      {/* Current Location Marker (if available) */}
      {currentLocation && (
        <Marker
          coordinate={currentLocation}
          title="Your Location"
          description="Current position"
        >
          <View style={styles.currentLocationMarker}>
            <View
              style={[
                styles.currentLocationDot,
                { backgroundColor: Colors.primary },
              ]}
            />
          </View>
        </Marker>
      )}

      {/* Pickup Marker */}
      {showPickupMarker && (
        <Marker
          coordinate={blingCenterLocation}
          title={pickupLabel}
          description={pickupDescription}
        >
          <View
            style={[
              Layout.center,
              {
                width: mS(40),
                height: mS(40),
                borderRadius: mS(20),
                backgroundColor: Colors.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
            ]}
          >
            <Images.svg.Box.default width={mS(24)} height={mS(24)} />
          </View>
        </Marker>
      )}

      {/* Dropoff Marker */}
      <Marker
        coordinate={buyerLocation}
        title={dropoffLabel}
        description={dropoffDescription}
      >
        {dropoffType === "warehouse" ? (
          <View
            style={[
              Layout.center,
              {
                width: mS(40),
                height: mS(40),
                borderRadius: mS(20),
                backgroundColor: Colors.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
            ]}
          >
            <Images.svg.Box.default width={mS(24)} height={mS(24)} />
          </View>
        ) : (
          <Images.svg.Google_Map_Marker.default
            width={mS(40)}
            height={mS(50)}
          />
        )}
      </Marker>
    </MapView>
  );

  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      {isLoadingLocation || !mapRegion ? renderLoadingState() : renderMapView()}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentLocationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0, 52, 65, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  currentLocationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default MapHeader;
