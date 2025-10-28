import { useTheme } from "@/src/hooks";
import { getStatusColor, getStatusText, mS } from "@/src/utils/helper";
import { Package } from "@/src/utils/mockData";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomLineSeparater from "../../CustomLineSeparater";
import { packageListItemStyles } from "./Styles";

interface PackageListItemProps {
  package: Package;
  onPress?: () => void;
}

const PackageListItem: React.FC<PackageListItemProps> = ({
  package: packageData,
  onPress,
}) => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        Gutters.xTinyGapPadding,
        Gutters.xTinyBMargin,
        Gutters.xTinyGapHMargin,
        Gutters.gapRadius,
        Gutters.lightShadow,
        packageListItemStyles.dynamic.container(Colors),
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
                packageListItemStyles.dynamic.packageTitle(Colors),
              ]}
            >
              {packageData.packageNumber}
            </Text>
            <Text
              style={[
                Fonts.POPPINS_REGULAR_12,
                packageListItemStyles.dynamic.customerName(Colors),
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
            packageListItemStyles.dynamic.statusBadge(
              getStatusColor(packageData.status, Colors)
            ),
          ]}
        >
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_13,
              packageListItemStyles.dynamic.statusText(Colors),
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
              packageListItemStyles.dynamic.addressText(Colors),
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

export default PackageListItem;
