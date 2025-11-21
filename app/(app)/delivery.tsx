import {
  DeliveryInfoCard,
  DeliverySuccessModal,
  MapHeader,
} from "@/src/components/screens/delivery";
import { createDeliverySheetStyles } from "@/src/components/screens/delivery/DeliverySheet.styles";
import {
  useDeliveryMap,
  useShipmentActions,
  useShipments,
  useTheme,
} from "@/src/hooks";
import { Shipment } from "@/src/types/shipments";
import { mockPackages, Package } from "@/src/utils/mockData";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Helper function to map new statuses to legacy statuses
const mapStatusToLegacy = (
  status: Shipment["status"]
): "waiting" | "in_transit" | "completed" | "canceled" => {
  switch (status) {
    case "CREATED":
      return "waiting";
    case "ASSIGNED":
    case "PICKED_VENDOR":
    case "DROPPED_WAREHOUSE":
    case "PICKED_WAREHOUSE":
      return "in_transit";
    case "DELIVERED":
      return "completed";
    case "CANCELLED":
    case "FAILED":
      return "canceled";
    default:
      // Legacy statuses pass through
      if (
        status === "waiting" ||
        status === "in_transit" ||
        status === "completed" ||
        status === "canceled"
      ) {
        return status;
      }
      return "waiting";
  }
};

// Helper function to convert Shipment to Package format
const convertShipmentToPackage = (shipment: Shipment): Package => ({
  id: shipment.id,
  packageNumber: shipment.orderNo,
  customerName: shipment.vendorName,
  status: mapStatusToLegacy(shipment.status),
  departureDate: shipment.createdAt,
  fromAddress: "", // Will be populated from API if available
  toAddress: "", // Will be populated from API if available
  destination: shipment.vendorName, // Using vendor name as destination
  progress:
    shipment.status === "in_transit" || shipment.status === "ASSIGNED"
      ? 50
      : shipment.status === "completed" || shipment.status === "DELIVERED"
      ? 100
      : 0,
});

const Delivery = () => {
  const { Layout, Colors, Gutters } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const insets = useSafeAreaInsets();
  const sheetStyles = createDeliverySheetStyles(Colors, insets);

  // Fetch shipments from multiple tabs to find the one by ID
  const { shipments: allShipments } = useShipments({
    filter: "all",
    limit: 100,
    enabled: true,
  });
  const { shipments: offersShipments } = useShipments({
    filter: "offers",
    limit: 100,
    enabled: true,
  });
  const { shipments: activeShipments } = useShipments({
    filter: "in_transit",
    limit: 100,
    enabled: true,
  });
  const { shipments: historyShipments } = useShipments({
    filter: "completed",
    limit: 100,
    enabled: true,
  });

  // Combine all shipments from different tabs
  const shipments = useMemo(() => {
    const combined = [
      ...allShipments,
      ...offersShipments,
      ...activeShipments,
      ...historyShipments,
    ];
    // Remove duplicates based on ID
    const uniqueShipments = Array.from(
      new Map(combined.map((s) => [s.id, s])).values()
    );
    return uniqueShipments;
  }, [allShipments, offersShipments, activeShipments, historyShipments]);

  // Find the shipment
  const shipment: Shipment | undefined = useMemo(() => {
    if (params?.id) {
      return shipments.find((s) => s.id === String(params.id));
    }
    return undefined;
  }, [params?.id, shipments]);

  // Convert shipment to package for display
  const pkg: Package | undefined = useMemo(() => {
    if (shipment) {
      return convertShipmentToPackage(shipment);
    }
    // Fallback to mockPackages for backward compatibility
    if (params?.id) {
      return mockPackages.find((p) => p.id === String(params.id));
    }
    return mockPackages.find((p) => p.status !== "completed");
  }, [shipment, params?.id]);

  // Use shipment actions hook
  const {
    buttonText,
    isButtonDisabled,
    isButtonLoading,
    handleAction,
    directions,
  } = useShipmentActions({
    shipment: shipment || null,
    shipmentId: params?.id || null,
    enabled: !!params?.id,
  });

  // Debug logging for directions
  useEffect(() => {
    if (directions?.data) {
      console.log("=== DIRECTIONS DEBUG ===");
      console.log("Segment:", directions.data.segment);
      console.log("From Location:", {
        lat: directions.data.fromLatitude,
        lng: directions.data.fromLongitude,
        label: directions.data.fromLabel,
      });
      console.log("To Location:", {
        lat: directions.data.toLatitude,
        lng: directions.data.toLongitude,
        label: directions.data.toLabel,
        address: directions.data.toAddress,
      });
      console.log("Has Polyline:", !!directions.data.polyline);
      console.log("Polyline length:", directions.data.polyline?.length || 0);
      console.log("=======================");
    }
  }, [directions]);

  // Use delivery map hook for live tracking (depends on directions data)
  const {
    currentLocation,
    blingCenterLocation,
    buyerLocation,
    mapRegion,
    routeCoordinates,
    isLoadingLocation,
    startLocationTracking,
  } = useDeliveryMap(directions?.data);

  const pickupLabel = directions?.data?.fromLabel ?? "Bling Center";
  const pickupDescription = directions?.data?.fromLabel ?? "Pickup location";
  const dropoffLabel = directions?.data?.toLabel ?? "Delivery Location";
  const dropoffDescription = directions?.data?.toAddress ?? "Customer address";
  const segment = directions?.data?.segment;
  const showPickupMarker = segment !== "TO_VENDOR";
  const dropoffType =
    segment === "TO_VENDOR"
      ? "vendor"
      : segment === "TO_WAREHOUSE"
      ? "warehouse"
      : "customer";

  // Track delivery success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  // Show modal when delivery is completed
  useEffect(() => {
    const isDelivered =
      shipment?.status === "DELIVERED" || pkg?.status === "completed";

    if (isDelivered && !hasShownModal) {
      setShowSuccessModal(true);
      setHasShownModal(true);
    } else if (!isDelivered) {
      // Reset modal state if status changes back (shouldn't happen, but safety)
      setHasShownModal(false);
    }
  }, [shipment?.status, pkg?.status, hasShownModal]);

  // Handle "Thanks" button - navigate to home screen
  const handleThanksPress = () => {
    setShowSuccessModal(false);
    // Navigate to home tab (first tab) - index route
    router.replace("/(app)/(tabs)/index" as any);
  };

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
        pickupLabel={pickupLabel}
        pickupDescription={pickupDescription}
        dropoffLabel={dropoffLabel}
        dropoffDescription={dropoffDescription}
        showPickupMarker={showPickupMarker}
        dropoffType={dropoffType}
      />

      {/* Bottom Sheet */}
      {pkg ? (
        <View
          style={[Layout.absolute, sheetStyles.bottomSheet, { zIndex: 1000 }]}
        >
          {/* Drag handle */}
          <View style={sheetStyles.dragHandle} />

          <DeliveryInfoCard
            pkg={pkg}
            onMessage={() => {}}
            onCall={() => {}}
            onPrimaryAction={handleAction}
            primaryButtonText={buttonText}
            isPrimaryButtonLoading={isButtonLoading}
            isPrimaryButtonDisabled={isButtonDisabled}
            directions={directions?.data}
          />
        </View>
      ) : null}

      {/* Delivery Success Modal */}
      <DeliverySuccessModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onThanksPress={handleThanksPress}
      />
    </View>
  );
};

export default Delivery;

const styles = StyleSheet.create({});
