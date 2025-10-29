import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import React from "react";
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
}

const MapHeader: React.FC<MapHeaderProps> = ({
  currentLocation,
  blingCenterLocation,
  buyerLocation,
  mapRegion,
  routeCoordinates,
  isLoadingLocation,
}) => {
  const { Layout, Colors, Fonts, Images } = useTheme();
  const height = Math.min(Dimensions.get("window").height * 0.45, 420);

  /**
   * Renders loading state while getting location
   */
  const renderLoadingState = () => (
    <View
      style={[
        Layout.fill,
        Layout.center,
        { backgroundColor: Colors.background_F0F3F4 },
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
  );

  /**
   * Renders map view with markers and route
   */
  const renderMapView = () => (
    <MapView
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
          strokeColor={Colors.primary}
          strokeWidth={4}
          lineDashPattern={[0]}
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

      {/* Bling Center Marker (Pickup Location) */}
      <Marker
        coordinate={blingCenterLocation}
        title="Bling Center"
        description="Pickup location"
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

      {/* Buyer Location Marker (Delivery Destination) */}
      <Marker
        coordinate={buyerLocation}
        title="Delivery Location"
        description="Customer address"
      >
        <Images.svg.Google_Map_Marker.default width={mS(40)} height={mS(50)} />
      </Marker>
    </MapView>
  );

  return (
    <View style={{ height }}>
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
