import { useTheme } from "@/src/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface PackageFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { key: "all", label: "common:filters.all" },
  { key: "offers", label: "common:filters.offers" },
  { key: "in_transit", label: "common:filters.in_transit" },
  { key: "completed", label: "common:filters.completed" },
  { key: "canceled", label: "common:filters.canceled" },
];

const PackageFilters: React.FC<PackageFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[]}>
      <Text
        style={[
          Fonts.POPPINS_MEDIUM_20,
          Gutters.xTinyHPadding,
          Gutters.xTinyVPadding,
        ]}
      >
        {t("common:packages")}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={Gutters.gapBPadding}
      >
        {filters.map((filter, index) => {
          const isActive = activeFilter === filter.key;
          return (
            <TouchableOpacity
              key={filter.key}
              activeOpacity={0.8}
              onPress={() => onFilterChange(filter.key)}
              style={[
                Gutters.smallHPadding,
                Gutters.tinyVPadding,
                Gutters.gapRMargin,
                Gutters.mediumRadius,
                Gutters.tinyBMargin,
                index == 0 && Gutters.xTinyLMargin,
                createStyles.filterButton(Colors, isActive),
              ]}
            >
              <Text
                style={[
                  Fonts.POPPINS_MEDIUM_14,
                  createStyles.filterText(Colors, isActive),
                ]}
              >
                {t(filter.label)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const createStyles = {
  filterButton: (Colors: any, isActive: boolean) => ({
    backgroundColor: isActive ? Colors.primary : Colors.background,
    borderColor: isActive ? Colors.primary : Colors.border_primary,
    borderWidth: 1,
  }),
  filterText: (Colors: any, isActive: boolean) => ({
    color: isActive ? Colors.white : Colors.text,
  }),
};

export default PackageFilters;
