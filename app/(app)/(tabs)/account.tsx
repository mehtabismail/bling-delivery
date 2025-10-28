import LogoutButton from "@/src/components/screens/account/LogoutButton";
import MenuList from "@/src/components/screens/account/MenuList";
import PromoCard from "@/src/components/screens/account/PromoCard";
import { useTheme } from "@/src/hooks";
import { changeAppLanguage } from "@/src/translations";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ScrollView, Text, View } from "react-native";

const Account = () => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <ScrollView
        style={[Layout.fill]}
        contentContainerStyle={[{ flexGrow: 1 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[Layout.center, Gutters.largeTMargin]}>
          <Text style={[Fonts.POPPINS_MEDIUM_24, { color: Colors.text }]}>
            {t("common:account")}
          </Text>
        </View>

        {/* Promo Card */}
        <PromoCard onPress={() => {}} />

        {/* Menu List */}
        <MenuList />

        {/* Logout Button */}
        <LogoutButton />

        {/* Language Switcher (temporary for testing) */}
        <View style={[Layout.center, Gutters.largeTMargin]}>
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_16,
              { color: Colors.text, marginBottom: 12 },
            ]}
          >
            Language Settings
          </Text>
          <Button
            title="Switch to Arabic"
            onPress={() => changeAppLanguage("ar")}
          />
          <Button
            title="Switch to English"
            onPress={() => changeAppLanguage("en")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Account;
