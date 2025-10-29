import {
  CustomHeader,
  CustomPackageCard,
  CustomTextInput,
} from "@/src/components";
import FeaturedPackageCard from "@/src/components/screens/home/FeaturedPackageCard";
import PackageFilters from "@/src/components/screens/home/PackageFilters";
import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import { mockPackages, Package } from "@/src/utils/mockData";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";

const Home = () => {
  const { Layout, Colors, Gutters } = useTheme();
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleChangeInput = (value: string, fieldname: any) => {
    setSearch(value);
  };

  // Get featured package (first in-transit package)
  const featuredPackage = mockPackages.find(
    (pkg) => pkg.status === "in_transit"
  );

  // Filter packages based on active filter
  const filteredPackages = mockPackages.filter((pkg) => {
    if (activeFilter === "all") return true;
    return pkg.status === activeFilter;
  });

  // Filter by search if search text exists
  const searchFilteredPackages = search
    ? filteredPackages.filter(
        (pkg) =>
          pkg.packageNumber.toLowerCase().includes(search.toLowerCase()) ||
          pkg.customerName.toLowerCase().includes(search.toLowerCase())
      )
    : filteredPackages;

  const renderPackageItem = ({ item }: { item: Package }) => (
    <CustomPackageCard
      package={item}
      variant="home"
      onPress={() => {}}
      customStyles={Gutters.xTinyHMargin}
    />
  );

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <CustomHeader
        centerIcon="Bling"
        rightIcon="Notification"
        onPressRight={() => router.push("/(app)/notification")}
        customStyles={[Layout.screenWithoutFill]}
      />

      <FlatList
        data={searchFilteredPackages}
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

            {/* Featured Package Card (only show if no search) */}
            {!search && featuredPackage && (
              <FeaturedPackageCard
                package={featuredPackage}
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
        contentContainerStyle={{ paddingBottom: mS(20) }}
      />
    </View>
  );
};

export default Home;
