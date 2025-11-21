import CustomButton from "@/src/components/CustomButton";
import CustomLineSeparater from "@/src/components/CustomLineSeparater";
import SlideToConfirm from "@/src/components/SlideToConfirm";
import { useTheme } from "@/src/hooks";
import { DirectionsResponse } from "@/src/types/shipments";
import { getStatusText, mS } from "@/src/utils/helper";
import { Package } from "@/src/utils/mockData";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface DeliveryInfoCardProps {
  pkg: Package;
  onMessage?: () => void;
  onCall?: () => void;
  onPrimaryAction?: () => void;
  primaryButtonText?: string | null;
  isPrimaryButtonLoading?: boolean;
  isPrimaryButtonDisabled?: boolean;
  directions?: DirectionsResponse["data"];
}

const DeliveryInfoCard: React.FC<DeliveryInfoCardProps> = ({
  pkg,
  onMessage,
  onCall,
  onPrimaryAction,
  primaryButtonText,
  isPrimaryButtonLoading = false,
  isPrimaryButtonDisabled = false,
  directions,
}) => {
  const { Layout, Gutters, Fonts, Colors, Images } = useTheme();

  // Use provided button text or fallback to default
  const primaryCtaText =
    primaryButtonText !== undefined
      ? primaryButtonText || "Continue"
      : pkg.status === "waiting"
      ? "Accept Order"
      : "Continue";

  // Format dates from directions API
  const { departureTime, expectedTime } = useMemo(() => {
    if (directions) {
      // Expected time from API (arrival time)
      const expected =
        directions.arrivalTimeLocal ||
        dayjs(directions.arrivalTimeIso).format("DD MMM hh:mm A");

      // Calculate departure time: arrival time minus ETA
      let departure: string;
      if (directions.arrivalTimeIso && directions.etaSeconds) {
        const arrivalDate = dayjs(directions.arrivalTimeIso);
        const departureDate = arrivalDate.subtract(
          directions.etaSeconds,
          "second"
        );
        departure = departureDate.format("DD MMM hh:mm A");
      } else {
        // Fallback to current time if ETA not available
        departure = dayjs().format("DD MMM hh:mm A");
      }

      return {
        departureTime: departure,
        expectedTime: expected,
      };
    }

    // Fallback to package data or default
    return {
      departureTime: pkg.departureDate || dayjs().format("DD MMM hh:mm A"),
      expectedTime: dayjs().add(2, "day").format("DD MMM hh:mm A"),
    };
  }, [directions, pkg.departureDate]);

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
          {directions?.toAddress || pkg.fromAddress || "Address not available"}
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
            {departureTime}
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
            {expectedTime}
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

      {/* Primary action button inside card */}
      {primaryCtaText && (
        <>
          {primaryCtaText === "Picked from Warehouse" ? (
            <View style={Gutters.gapTMargin}>
              <SlideToConfirm
                onConfirm={onPrimaryAction || (() => {})}
                disabled={isPrimaryButtonDisabled}
                loading={isPrimaryButtonLoading}
              />
            </View>
          ) : (
            <CustomButton
              btnText={primaryCtaText}
              onPress={onPrimaryAction || (() => {})}
              customStyle={Gutters.gapTMargin}
              disabled={isPrimaryButtonDisabled || isPrimaryButtonLoading}
              loading={isPrimaryButtonLoading}
            />
          )}
        </>
      )}
    </View>
  );
};

export default DeliveryInfoCard;
