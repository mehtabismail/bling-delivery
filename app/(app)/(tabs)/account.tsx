import { CustomButton, ScreenWrapper } from "@/src/components";
import { useTheme } from "@/src/hooks";
import { logout } from "@/src/store/auth/AuthSlice";
import { persistor } from "@/src/store/store";
import { changeAppLanguage } from "@/src/translations";
import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";

const Account = () => {
  const { Layout } = useTheme();

  const dispatch = useDispatch();

  return (
    <ScreenWrapper customStyle={[Layout.center]}>
      <CustomButton
        btnText='Log Out'
        onPress={async () => {
          dispatch(logout());
          await persistor.purge();
          await persistor.flush();
          router.dismissAll();
          router.replace("/(auth)");
        }}
      />
      {/* <LanguageSwitcher /> */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>{t("welcome")}</Text>

        <Button
          title='Switch to Arabic'
          onPress={() => changeAppLanguage("ar")}
        />
        <Button
          title='Switch to English'
          onPress={() => changeAppLanguage("en")}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Account;
