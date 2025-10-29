import { useTheme } from "@/src/hooks";
import { getStatusColor, getStatusText, mS } from "@/src/utils/helper";
import { Package } from "@/src/utils/mockData";
import React from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import CustomLineSeparater from "./CustomLineSeparater";
import { customPackageCardStyles } from "./CustomStyles";

interface CustomPackageCardProps {
  package: Package;
  onPress?: () => void;
  variant?: "home" | "packages";
  customStyles?: StyleProp<ViewStyle>;
}

const CustomPackageCard: React.FC<CustomPackageCardProps> = ({
  package: packageData,
  onPress,
  variant = "home",
  customStyles,
}) => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();

  // Both variants render the same design for now
  // variant prop kept for future customization
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        Gutters.xTinyGapPadding,
        Gutters.xTinyBMargin,
        Gutters.gapRadius,
        Gutters.lightShadow,
        customPackageCardStyles.dynamic.container(Colors),
        customStyles,
      ]}
    >
      {/* Header Row */}
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.alignItemsCenter,
          Gutters.tinyBMargin,
        ]}
      >
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <View style={[Gutters.gapRMargin]}>
            <Images.svg.Black_Box.default />
          </View>
          <View>
            <Text
              style={[
                Fonts.POPPINS_MEDIUM_15,
                customPackageCardStyles.dynamic.packageTitle(Colors),
              ]}
            >
              {packageData.packageNumber}
            </Text>
            <Text
              style={[
                Fonts.POPPINS_REGULAR_12,
                customPackageCardStyles.dynamic.customerName(Colors, variant),
              ]}
            >
              {packageData.customerName}
            </Text>
          </View>
        </View>
        <View
          style={[
            Gutters.xTinyHPadding,
            Gutters.tinyVPadding,
            Gutters.smallRadius,
            customPackageCardStyles.dynamic.statusBadge(
              getStatusColor(packageData.status, Colors)
            ),
          ]}
        >
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_13,
              customPackageCardStyles.dynamic.statusText(Colors),
            ]}
          >
            {getStatusText(packageData.status)}
          </Text>
        </View>
      </View>

      {/* Line Separater */}
      <CustomLineSeparater />

      {/* Address Row */}
      <View
        style={[
          Layout.row,
          Gutters.littleTPadding,
          Gutters.tinyBPadding,
          Gutters.tinyHMargin,
          Layout.alignItemsCenter,
        ]}
      >
        <View style={[Layout.row, Layout.alignItemsCenter, Layout.fill]}>
          <Images.svg.Location_Marker.default
            width={mS(14)}
            height={mS(14)}
            fill={Colors.text_91A8AD}
          />
          <Text
            style={[
              Fonts.POPPINS_REGULAR_13,
              Layout.fill,
              Gutters.littleXGapLMargin,
              customPackageCardStyles.dynamic.addressText(Colors, variant),
            ]}
            numberOfLines={1}
          >
            {packageData.fromAddress}
          </Text>
        </View>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <Images.svg.Long_Arrow_Right.default fill={Colors.arrow_B7B7B7} />
          <Text style={[Fonts.POPPINS_REGULAR_13, Gutters.tinyLMargin]}>
            {packageData.destination}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomPackageCard;
