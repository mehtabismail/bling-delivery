import { DeliveryInfoCard, MapHeader } from "@/src/components/screens/delivery";
import { createDeliverySheetStyles } from "@/src/components/screens/delivery/DeliverySheet.styles";
import { useDeliveryMap, useTheme } from "@/src/hooks";
import { mockPackages, Package } from "@/src/utils/mockData";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Delivery = () => {
  const { Layout, Colors, Gutters } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const insets = useSafeAreaInsets();
  const sheetStyles = createDeliverySheetStyles(Colors, insets);

  // Use delivery map hook for live tracking
  const {
    currentLocation,
    blingCenterLocation,
    buyerLocation,
    mapRegion,
    routeCoordinates,
    isLoadingLocation,
    startLocationTracking,
  } = useDeliveryMap();

  const pkg: Package | undefined = useMemo(() => {
    if (!params?.id) return mockPackages.find((p) => p.status !== "completed");
    return mockPackages.find((p) => p.id === String(params.id));
  }, [params?.id]);

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      {/* Live Map with Tracking */}
      <MapHeader
        currentLocation={currentLocation}
        blingCenterLocation={blingCenterLocation}
        buyerLocation={buyerLocation}
        mapRegion={mapRegion}
        routeCoordinates={routeCoordinates}
        isLoadingLocation={isLoadingLocation}
        bottomSheetRatio={0.6}
      />

      {/* Bottom Sheet */}
      {pkg && (
        <View style={[Layout.absolute, sheetStyles.bottomSheet]}>
          {/* Drag handle */}
          <View style={sheetStyles.dragHandle} />

          <DeliveryInfoCard pkg={pkg} onMessage={() => {}} onCall={() => {}} />
        </View>
      )}
    </View>
  );
};

export default Delivery;

const styles = StyleSheet.create({});
