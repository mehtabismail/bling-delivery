import { ScreenWrapper } from "@/src/components";
import LogoutButton from "@/src/components/screens/account/LogoutButton";
import MenuList from "@/src/components/screens/account/MenuList";
import PromoCard from "@/src/components/screens/account/PromoCard";
import { useTheme } from "@/src/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const Account = () => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <View style={[Layout.center]}>
        <Text style={[Fonts.POPPINS_MEDIUM_24, { color: Colors.text }]}>
          {t("common:account")}
        </Text>
      </View>

      <ScreenWrapper showsVerticalScrollIndicator={false}>
        {/* Promo Card */}
        <PromoCard onPress={() => {}} />

        {/* Menu List */}
        <MenuList />

        {/* Logout Button */}
        <LogoutButton />
      </ScreenWrapper>
    </View>
  );
};

export default Account;
