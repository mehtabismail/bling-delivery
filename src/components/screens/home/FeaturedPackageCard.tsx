import { useTheme } from "@/src/hooks";
import { mS, truncateWords } from "@/src/utils/helper";
import { Package } from "@/src/utils/mockData";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { featuredCardStyles } from "./Styles";

interface FeaturedPackageCardProps {
  package: Package;
  onPress?: () => void;
}

const FeaturedPackageCard: React.FC<FeaturedPackageCardProps> = ({
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
        Gutters.xTinyPadding,
        Gutters.smallTPadding,
        Gutters.xTinyHMargin,
        Gutters.xTinyTMargin,
        Gutters.xLittleBMargin,
        Gutters.xTinyGapRadius,
        featuredCardStyles.dynamic.container(Colors),
      ]}
    >
      {/* Header Row with Icon, Info, and Status Badge */}
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.alignItemsCenter,
          Gutters.littleBMargin,
        ]}
      >
        <View style={[Layout.row, Layout.alignItemsCenter, Layout.fill]}>
          {/* Box Icon */}
          <View style={[Gutters.gapRMargin]}>
            <Images.svg.Complete_Box.default height={mS(42)} width={mS(42)} />
          </View>

          {/* Package Info */}
          <View style={[Layout.fill, Gutters.gapRMargin]}>
            <Text
              style={[
                Fonts.POPPINS_MEDIUM_16,
                featuredCardStyles.dynamic.packageNumber(Colors),
              ]}
            >
              {packageData.packageNumber}
            </Text>
            <Text
              style={[
                Fonts.POPPINS_REGULAR_13,
                featuredCardStyles.static.customerName,
              ]}
            >
              {packageData.customerName}
            </Text>
          </View>
        </View>

        {/* Status Badge */}
        <View
          style={[
            Gutters.xTinyHPadding,
            Gutters.littleGapVPadding,
            Gutters.xTinyXGapRadius,
            featuredCardStyles.static.statusBadge,
          ]}
        >
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_12,
              featuredCardStyles.dynamic.statusText(Colors),
            ]}
          >
            {getStatusText(packageData.status)}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      {packageData.status === "in_transit" && packageData.progress && (
        <View style={[Gutters.xTinyTMargin, Gutters.gapBMargin]}>
          <View
            style={[
              Layout.overflow,
              Gutters.miniGapRadius,
              featuredCardStyles.static.progressBarBackground,
            ]}
          >
            <View
              style={[
                Layout.fullHeight,
                Gutters.miniGapRadius,
                featuredCardStyles.dynamic.progressBarFill(
                  Colors,
                  packageData.progress
                ),
              ]}
            />
          </View>
        </View>
      )}

      {/* Address Row */}
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          Gutters.littleTMargin,
          { width: "100%" },
        ]}
      >
        {/* Left Location (Source) - Only show if fromAddress exists */}
        {packageData.fromAddress ? (
          <>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                { flex: 1, minWidth: 0 },
              ]}
            >
              {packageData.leftLocationType === "warehouse" ? (
                <Images.svg.Map_Box.default
                  width={mS(14)}
                  height={mS(14)}
                  fill={Colors.white}
                />
              ) : (
                <Images.svg.Location_Marker.default
                  width={mS(14)}
                  height={mS(14)}
                  fill={Colors.white}
                />
              )}
              <Text
                style={[
                  Fonts.POPPINS_REGULAR_13,
                  { flex: 1 },
                  Gutters.littleXGapLMargin,
                  featuredCardStyles.static.addressText,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {truncateWords(packageData.fromAddress, 8)}
              </Text>
            </View>

            {/* Arrow - Only show if both locations exist */}
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                { flexShrink: 0 },
                Gutters.xLittleLMargin,
              ]}
            >
              <Images.svg.Long_Arrow_Right.default
                width={mS(18)}
                height={mS(18)}
                fill={Colors.white}
              />
            </View>
          </>
        ) : null}

        {/* Right Location (Destination) */}
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            packageData.fromAddress
              ? { flex: 1, minWidth: 0, marginLeft: mS(8) }
              : { flex: 1, minWidth: 0, width: "100%" },
          ]}
        >
          {packageData.rightLocationType === "warehouse" ? (
            <Images.svg.Map_Box.default
              width={mS(14)}
              height={mS(14)}
              fill={Colors.white}
            />
          ) : (
            <Images.svg.Location_Marker.default
              width={mS(14)}
              height={mS(14)}
              fill={Colors.white}
            />
          )}
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_13,
              { flex: 1 },
              Gutters.tinyLMargin,
              featuredCardStyles.dynamic.destinationText(Colors),
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {truncateWords(packageData.toAddress, 8)}
          </Text>
        </View>
      </View>

      {/* Departure Date */}
      {packageData.departureDate && (
        <View
          style={[
            Layout.row,
            Gutters.xTinyXGapRadiusTPadding,
            Gutters.xTinyTMargin,
            Gutters.littleBMargin,
          ]}
        >
          <Text
            style={[
              Fonts.POPPINS_REGULAR_12,
              featuredCardStyles.static.departureText,
              featuredCardStyles.static.departureDateLabel,
            ]}
          >
            {t("common:departure_at") + " : "}
          </Text>
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_15,

              featuredCardStyles.static.departureText,
              featuredCardStyles.static.departureDateValue,
            ]}
          >
            {packageData.departureDate}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// All styles are now centralized in Styles.tsx

export default FeaturedPackageCard;
