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
    <View style={[createStyles.containerWrapper]}>
      <View style={[createStyles.container(Colors)]}>
        <View style={[Layout.rowBetween, Layout.fill]}>
          <View style={[{ width: "60%" }]}>
            <Text style={[Fonts.POPPINS_MEDIUM_16, createStyles.title(Colors)]}>
              {t("common:promo.earn_cash_title")}
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPress}
              style={[
                Gutters.smallHPadding,
                Gutters.xTinyGapVPadding,
                Gutters.smallTMargin,
                Layout.selfStart,
                Gutters.smallRadius,
                createStyles.button(Colors),
              ]}
            >
              <Text
                style={[
                  Fonts.POPPINS_MEDIUM_12,
                  createStyles.buttonText(Colors),
                ]}
              >
                {t("common:promo.list_now")}
              </Text>
            </TouchableOpacity>
          </View>
          <Images.svg.Bling_Luxury.default />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Static styles can stay here if any
});

const createStyles = {
  containerWrapper: {
    marginTop: mS(16),
    alignItems: "center",
    justifyContent: "center",
  },
  container: (Colors: any) => ({
    width: "100%",
    height: mS(170),
    backgroundColor: Colors.primary,
    borderRadius: mS(30),
    opacity: 1,
    padding: mS(24),
    paddingHorizontal: mS(28),
    paddingBottom: mS(16),
  }),
  title: (Colors: any) => ({
    color: Colors.white,
    lineHeight: mS(20),
  }),
  button: (Colors: any) => ({
    backgroundColor: Colors.white + "30",
    paddingHorizontal: mS(16),
    paddingVertical: mS(6),
  }),
  buttonText: (Colors: any) => ({
    color: Colors.white,
  }),
  logoBox: (Colors: any) => ({
    backgroundColor: Colors.primary_dark || "#1a4d5d",
    borderRadius: mS(12),
    paddingHorizontal: mS(16),
    paddingVertical: mS(12),
    minWidth: mS(100),
  }),
  subtitle: (Colors: any) => ({
    color: Colors.white,
    fontSize: mS(8),
    letterSpacing: 0.5,
  }),
};

export default PromoCard;
