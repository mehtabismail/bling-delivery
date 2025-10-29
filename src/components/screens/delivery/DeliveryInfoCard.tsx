import CustomButton from "@/src/components/CustomButton";
import CustomLineSeparater from "@/src/components/CustomLineSeparater";
import { useTheme } from "@/src/hooks";
import { getStatusText, mS } from "@/src/utils/helper";
import { Package } from "@/src/utils/mockData";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface DeliveryInfoCardProps {
  pkg: Package;
  onMessage?: () => void;
  onCall?: () => void;
  onPrimaryAction?: () => void;
}

const DeliveryInfoCard: React.FC<DeliveryInfoCardProps> = ({
  pkg,
  onMessage,
  onCall,
  onPrimaryAction,
}) => {
  const { Layout, Gutters, Fonts, Colors, Images } = useTheme();

  const primaryCtaText = pkg.status === "waiting" ? "Accept Order" : "Continue";

  return (
    <View style={[Gutters.xTinyGapPadding]}>
      {/* Header */}
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.alignItemsCenter,
        ]}
      >
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <View
            style={[
              Gutters.smallRadius,
              Layout.center,
              Gutters.gapRMargin,
              {
                width: mS(44),
                height: mS(44),
                backgroundColor: Colors.background_F0F3F4,
              },
            ]}
          >
            <Images.svg.Box.default />
          </View>
          <Text style={[Fonts.POPPINS_MEDIUM_17]}>{pkg.packageNumber}</Text>
        </View>

        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <View
            style={[
              Gutters.xTinyHPadding,
              Gutters.tinyVPadding,
              Gutters.smallRadius,
              {
                backgroundColor: Colors.transparent,
                borderWidth: 1,
                borderColor: Colors.primary,
              },
            ]}
          >
            <Text
              style={[Fonts.POPPINS_MEDIUM_13, { color: Colors.text_003441 }]}
            >
              {getStatusText(pkg.status)}
            </Text>
          </View>
          <View style={{ marginLeft: mS(12) }}>
            <Images.svg.Dots.default />
          </View>
        </View>
      </View>

      {/* Address row as pill */}
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          Gutters.tinyVPadding,
          Gutters.mediumTMargin,
          Gutters.xTinyBMargin,
          Gutters.xTinyHPadding,
          Gutters.gapRadius,
          { backgroundColor: Colors.textinput_background },
        ]}
      >
        <Images.svg.Location_Marker.default width={mS(14)} height={mS(14)} />
        <Text
          style={[
            Fonts.POPPINS_REGULAR_13,
            { marginLeft: mS(8), color: Colors.text, flex: 1 },
          ]}
          numberOfLines={1}
        >
          {pkg.fromAddress}
        </Text>
      </View>

      {/* Departure/Expected */}
      <View
        style={[Layout.row, Layout.justifyContentBetween, Gutters.tinyVPadding]}
      >
        <View>
          <Text
            style={[Fonts.POPPINS_REGULAR_13, { color: Colors.text_61605D }]}
          >
            Departure at:
          </Text>
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_15,
              Gutters.littleTMargin,
              { color: Colors.text },
            ]}
          >
            12 May 08:00 AM
          </Text>
        </View>
        <View>
          <Text
            style={[Fonts.POPPINS_REGULAR_13, { color: Colors.text_61605D }]}
          >
            Expected at:
          </Text>
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_15,
              Gutters.littleTMargin,
              { color: Colors.text },
            ]}
          >
            14 May 02:00 PM
          </Text>
        </View>
      </View>

      <CustomLineSeparater />

      {/* Customer Row */}
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.alignItemsCenter,
        ]}
      >
        <View>
          <Text style={[Fonts.POPPINS_MEDIUM_15, { color: Colors.text }]}>
            Abdallah Ahmed
          </Text>
          <Text
            style={[Fonts.POPPINS_REGULAR_13, { color: Colors.text_61605D }]}
          >
            00201200355945
          </Text>
        </View>
        <View style={[Layout.row]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onMessage}
            style={[
              Layout.center,
              Gutters.tinyMargin,
              {
                width: mS(48),
                height: mS(48),
                borderRadius: mS(28),
                backgroundColor: Colors.primary,
              },
            ]}
          >
            <Images.svg.Message.default />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onCall}
            style={[
              Layout.center,
              Gutters.tinyMargin,
              {
                width: mS(48),
                height: mS(48),
                borderRadius: mS(28),
                backgroundColor: Colors.primary,
              },
            ]}
          >
            <Images.svg.Phone.default />
          </TouchableOpacity>
        </View>
      </View>

      {/* Accept button inside card */}
      <CustomButton
        btnText={primaryCtaText}
        onPress={onPrimaryAction || (() => {})}
        customStyle={Gutters.gapTMargin}
      />
    </View>
  );
};

export default DeliveryInfoCard;
