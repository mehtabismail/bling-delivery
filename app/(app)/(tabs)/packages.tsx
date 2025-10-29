import { CustomHeader, CustomPackageCard } from "@/src/components";
import PackageTabHeader from "@/src/components/screens/packages/PackageTabHeader";
import { useTheme } from "@/src/hooks";
import { mockPackages, Package } from "@/src/utils/mockData";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";

const Packages = () => {
  const { Layout, Colors, Gutters } = useTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"bling_center" | "customers">(
    "bling_center"
  );

  // For now, showing all packages in both tabs
  // In real app, you would filter based on the tab
  const filteredPackages = mockPackages;

  const renderPackageItem = ({ item }: { item: Package }) => (
    <CustomPackageCard
      package={item}
      variant="packages"
      onPress={() => {}}
      customStyles={Gutters.xTinyHMargin}
    />
  );

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <CustomHeader
        centerText={t("common:packages")}
        rightIcon="Notification"
        onPressRight={() => router.push("/(app)/notification")}
        customStyles={[Layout.screenWithoutFill]}
      />

      <View style={[Layout.fill]}>
        {/* Tab Header */}
        <PackageTabHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Package List */}
        <FlatList
          data={filteredPackages}
          renderItem={renderPackageItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Gutters.xTinyVPadding}
        />
      </View>
    </View>
  );
};

export default Packages;
