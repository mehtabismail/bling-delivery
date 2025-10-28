import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PromoCardProps {
  onPress?: () => void;
}

const PromoCard: React.FC<PromoCardProps> = ({ onPress }) => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[
        Gutters.smallPadding,
        Gutters.xTinyGapMargin,
        Gutters.smallTMargin,
        Gutters.xTinyGapRadius,
        createStyles.container(Colors),
      ]}
    >
      <View style={[Layout.rowBetween, Layout.alignItemsCenter]}>
        <View style={[Layout.fill, Gutters.xTinyGapRMargin]}>
          <Text style={[Fonts.POPPINS_MEDIUM_18, createStyles.title(Colors)]}>
            {t("common:promo.earn_cash_title")}
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
              Gutters.smallHPadding,
              Gutters.tinyVPadding,
              Gutters.xTinyGapTMargin,
              Layout.selfStart,
              Gutters.mediumRadius,
              createStyles.button(Colors),
            ]}
          >
            <Text
              style={[Fonts.POPPINS_MEDIUM_14, createStyles.buttonText(Colors)]}
            >
              {t("common:promo.list_now")}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            Layout.center,
            Gutters.xTinyGapPadding,
            Gutters.gapRadius,
            createStyles.iconCircle(Colors),
          ]}
        >
          <Images.svg.Bling.default width={mS(40)} height={mS(40)} />
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_10,
              Layout.textAlignCenter,
              Gutters.xMiniTMargin,
              createStyles.subtitle(Colors),
            ]}
          >
            {t("common:bling_luxury_store")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Static styles can stay here if any
});

const createStyles = {
  container: (Colors: any) => ({
    backgroundColor: Colors.primary,
  }),
  title: (Colors: any) => ({
    color: Colors.white,
    lineHeight: mS(24),
  }),
  button: (Colors: any) => ({
    backgroundColor: Colors.white + "30",
  }),
  buttonText: (Colors: any) => ({
    color: Colors.white,
  }),
  iconCircle: (Colors: any) => ({
    backgroundColor: Colors.white + "20",
    width: mS(80),
    height: mS(80),
  }),
  subtitle: (Colors: any) => ({
    color: Colors.white,
  }),
};

export default PromoCard;
