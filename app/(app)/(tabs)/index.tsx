import {
  CustomHeader,
  CustomPackageCard,
  CustomTextInput,
} from "@/src/components";
import FeaturedPackageCard from "@/src/components/screens/home/FeaturedPackageCard";
import PackageFilters from "@/src/components/screens/home/PackageFilters";
import { useShipments, useTheme } from "@/src/hooks";
import { Shipment } from "@/src/types/shipments";
import { mS } from "@/src/utils/helper";
import { Package } from "@/src/utils/mockData";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

const Home = () => {
  const { Layout, Colors, Gutters, Fonts } = useTheme();
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch shipments using custom hook with pagination
  const {
    shipments,
    isLoading,
    isFetching,
    isError,
    hasMore,
    loadMore,
    refresh,
    isLoadingMore,
  } = useShipments({
    filter: activeFilter,
    limit: 20,
    enabled: true,
  });

  // Fetch all shipments separately to find featured shipment (works on all tabs)
  const { shipments: allShipmentsForFeatured } = useShipments({
    filter: "all", // Always fetch from "all" to find featured shipment
    limit: 100, // Get enough to find a featured one
    enabled: true,
  });

  const handleChangeInput = (value: string, fieldname: any) => {
    setSearch(value);
  };

  // Get featured shipment from all shipments (works on any tab)
  // First active shipment with status: ASSIGNED, PICKED_VENDOR, DROPPED_WAREHOUSE, or PICKED_WAREHOUSE
  const featuredShipment = allShipmentsForFeatured.find(
    (shipment) =>
      shipment.status === "ASSIGNED" ||
      shipment.status === "PICKED_VENDOR" ||
      shipment.status === "DROPPED_WAREHOUSE" ||
      shipment.status === "PICKED_WAREHOUSE" ||
      shipment.status === "in_transit" // Legacy support
  );

  // Filter by search if search text exists
  const searchFilteredShipments = search
    ? shipments.filter(
        (shipment) =>
          shipment.orderNo.toLowerCase().includes(search.toLowerCase()) ||
          shipment.vendorName.toLowerCase().includes(search.toLowerCase())
      )
    : shipments;

  // Convert Shipment to Package format for display
  const convertToPackage = (shipment: Shipment): Package => {
    // Map shipment status to package status
    const mapStatus = (
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

    // Determine left and right locations based on status
    const isBeforeWarehousePickup =
      shipment.status === "CREATED" ||
      shipment.status === "ASSIGNED" ||
      shipment.status === "PICKED_VENDOR" ||
      shipment.status === "DROPPED_WAREHOUSE";

    // Left location: Vendor (if before warehouse pickup) or Warehouse (if after)
    const leftLocation = isBeforeWarehousePickup
      ? shipment.vendorName // Vendor name as source
      : shipment.warehouse?.name || shipment.warehouse?.address || "Warehouse";

    // Right location: Warehouse (if before pickup) or Destination (if after)
    const rightLocation = isBeforeWarehousePickup
      ? shipment.warehouse?.name || shipment.warehouse?.address || "Warehouse"
      : shipment.destinationLocation?.address || shipment.vendorName;

    // Left location type for icon
    const leftLocationType: "vendor" | "warehouse" | "customer" =
      isBeforeWarehousePickup ? "vendor" : "warehouse";

    // Right location type for icon
    const rightLocationType: "vendor" | "warehouse" | "customer" =
      isBeforeWarehousePickup
        ? "warehouse"
        : (shipment.destinationLocation?.type as
            | "vendor"
            | "warehouse"
            | "customer") || "customer";

    return {
      id: shipment.id,
      packageNumber: shipment.orderNo,
      customerName: shipment.vendorName,
      status: mapStatus(shipment.status),
      departureDate: shipment.createdAt,
      fromAddress: leftLocation,
      toAddress: rightLocation,
      destination: rightLocation,
      leftLocationType,
      rightLocationType,
      progress:
        shipment.status === "in_transit" ||
        shipment.status === "ASSIGNED" ||
        shipment.status === "PICKED_VENDOR" ||
        shipment.status === "DROPPED_WAREHOUSE" ||
        shipment.status === "PICKED_WAREHOUSE"
          ? 50
          : shipment.status === "completed" || shipment.status === "DELIVERED"
          ? 100
          : 0,
    };
  };

  const renderPackageItem = ({ item }: { item: Shipment }) => {
    const packageData = convertToPackage(item);
    return (
      <CustomPackageCard
        package={packageData}
        variant="home"
        onPress={() => {
          if (item.status !== "completed") {
            router.push(`/delivery?id=${item.id}` as any);
          }
        }}
        customStyles={Gutters.xTinyHMargin}
      />
    );
  };

  // Handle end reached for infinite scroll
  const handleEndReached = () => {
    if (hasMore && !isLoadingMore && !search) {
      loadMore();
    }
  };

  // Render loading indicator at the bottom
  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={[Layout.center, Gutters.regularVPadding]}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  };

  // Render empty state
  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={[Layout.center, Gutters.massiveTPadding]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }

    if (isError) {
      return (
        <View style={[Layout.center, Gutters.massiveTPadding]}>
          <Text style={[Fonts.POPPINS_MEDIUM_16, { color: Colors.error }]}>
            {t("common:errors.failed_to_load")}
          </Text>
        </View>
      );
    }

    return (
      <View style={[Layout.center, Gutters.massiveTPadding]}>
        <Text style={[Fonts.POPPINS_MEDIUM_16, { color: Colors.text_91A8AD }]}>
          {search
            ? t("common:no_search_results")
            : t("common:no_shipments_found")}
        </Text>
      </View>
    );
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <CustomHeader
        centerIcon="Bling"
        rightIcon="Notification"
        onPressRight={() => router.push("/(app)/notification")}
        customStyles={[Layout.screenWithoutFill]}
      />

      <FlatList
        data={searchFilteredShipments}
        renderItem={renderPackageItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Search Section */}
            <View style={[Layout.screenWithoutFill]}>
              <CustomTextInput
                placeholder={t("common:home.text_input_placeholder")}
                value={search}
                fieldName="search"
                handleChangeInput={handleChangeInput}
                keyboardType="web-search"
                type="text"
                leftIcon={"Search"}
                customContainerStyle={{
                  backgroundColor: Colors.textinput_background,
                  height: mS(48),
                  borderWidth: 0,
                  borderRadius: mS(18),
                }}
                numberOfLines={1}
              />
            </View>

            {/* Featured Shipment Card (only show if no search) */}
            {!search && featuredShipment && (
              <FeaturedPackageCard
                package={convertToPackage(featuredShipment)}
                onPress={() => {}}
              />
            )}

            {/* Package Filters */}
            <View style={[Layout.fullWidth]}>
              <PackageFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </View>
          </>
        }
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingBottom: mS(100) }}
        // Infinite scroll configuration
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        // Pull to refresh
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoadingMore}
            onRefresh={refresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      />
    </View>
  );
};

export default Home;
