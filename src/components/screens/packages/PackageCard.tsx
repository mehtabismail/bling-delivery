import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import { Package } from "@/src/utils/mockData";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { packageCardStyles } from "./Styles";

interface PackageCardProps {
  package: Package;
  onPress?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  package: packageData,
  onPress,
}) => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return Colors.status_waiting;
      case "in_transit":
        return Colors.status_in_transit;
      case "completed":
        return Colors.status_completed;
      case "canceled":
        return Colors.status_canceled;
      default:
        return Colors.status_waiting;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting":
        return t("common:status.waiting");
      case "in_transit":
        return t("common:status.in_transit");
      case "completed":
        return t("common:status.completed");
      case "canceled":
        return t("common:status.canceled");
      default:
        return t("common:status.waiting");
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        Gutters.xTinyGapPadding,
        Gutters.xTinyGapBMargin,
        Gutters.gapRadius,
        packageCardStyles.dynamic.container(Colors),
      ]}
    >
      {/* Header Row */}
      <View
        style={[
          Layout.rowBetween,
          Layout.alignItemsCenter,
          Gutters.tinyBMargin,
        ]}
      >
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <View
            style={[
              Gutters.tinyPadding,
              Gutters.gapRMargin,
              Gutters.mediumRadius,
              packageCardStyles.dynamic.iconContainer(Colors),
            ]}
          >
            <Images.svg.Box.default
              width={mS(24)}
              height={mS(24)}
              fill={Colors.primary}
            />
          </View>
          <View>
            <Text
              style={[
                Fonts.POPPINS_MEDIUM_16,
                packageCardStyles.dynamic.packageTitle(Colors),
              ]}
            >
              {packageData.packageNumber}
            </Text>
            <Text
              style={[
                Fonts.POPPINS_REGULAR_13,
                packageCardStyles.dynamic.customerName(Colors),
              ]}
            >
              {packageData.customerName}
            </Text>
          </View>
        </View>
        <View
          style={[
            Gutters.gapHPadding,
            Gutters.littleXGapVPadding,
            Gutters.smallRadius,
            packageCardStyles.dynamic.statusBadge(
              getStatusColor(packageData.status)
            ),
          ]}
        >
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_12,
              packageCardStyles.dynamic.statusText(Colors),
            ]}
          >
            {getStatusText(packageData.status)}
          </Text>
        </View>
      </View>

      {/* Address Row */}
      <View
        style={[
          Layout.rowBetween,
          Layout.alignItemsCenter,
          Gutters.smallTMargin,
        ]}
      >
        <View style={[Layout.row, Layout.alignItemsCenter, Layout.fill]}>
          <Images.svg.Location_Marker_Filled.default
            width={mS(16)}
            height={mS(16)}
            fill={Colors.text_91A8AD}
          />
          <Text
            style={[
              Fonts.POPPINS_REGULAR_13,
              Layout.fill,
              Gutters.littleXGapLMargin,
              { color: Colors.text_91A8AD },
            ]}
            numberOfLines={1}
          >
            {packageData.fromAddress}
          </Text>
        </View>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <Images.svg.Long_Arrow_Right.default
            width={mS(18)}
            height={mS(18)}
            fill={Colors.text_91A8AD}
          />
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_13,
              Gutters.xLittleLMargin,
              { color: Colors.text },
            ]}
          >
            {packageData.destination}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// All styles are now centralized in Styles.tsx

export default PackageCard;
