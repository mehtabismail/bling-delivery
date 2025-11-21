import { useTheme } from "@/src/hooks";
import { logout } from "@/src/store/auth/AuthSlice";
import { persistor } from "@/src/store/store";
import { mS } from "@/src/utils/helper";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const LogoutButton: React.FC = () => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge();
    await persistor.flush();
    router.dismissAll();
    router.replace("/(auth)");
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleLogout}
      style={[
        Layout.row,
        Layout.alignItemsCenter,
        Gutters.regularHPadding,
        Gutters.regularVPadding,
        Gutters.regularMargin,
        {
          backgroundColor: Colors.white,
          marginTop: mS(300),
        },
      ]}
    >
      <View style={[Gutters.smallRMargin]}>
        <Images.svg.Logout.default
          width={mS(24)}
          height={mS(24)}
          fill={Colors.error}
        />
      </View>
      <Text
        style={[
          Fonts.POPPINS_MEDIUM_16,
          {
            color: Colors.error,
          },
        ]}
      >
        {t("common:menu.logout")}
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
