import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

interface PackageTabHeaderProps {
  activeTab: "bling_center" | "customers";
  onTabChange: (tab: "bling_center" | "customers") => void;
}

const PackageTabHeader: React.FC<PackageTabHeaderProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const { t } = useTranslation();

  const tabs = [
    { key: "bling_center", label: "common:tabs.bling_center" },
    { key: "customers", label: "common:tabs.customers" },
  ];

  return (
    <View style={[Layout.row, Layout.screenWithoutFill]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            onPress={() => onTabChange(tab.key as "bling_center" | "customers")}
            style={[
              Layout.fill,
              Layout.center,
              Gutters.gapVPadding,
              {
                borderBottomWidth: mS(2),
                borderBottomColor: isActive
                  ? Colors.primary
                  : Colors.background_F0F3F4,
              },
            ]}
          >
            <Text
              style={[
                Fonts.POPPINS_MEDIUM_16,
                {
                  color: isActive ? Colors.primary : Colors.text_91A8AD,
                },
              ]}
            >
              {t(tab.label)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default PackageTabHeader;
