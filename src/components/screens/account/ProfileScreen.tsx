import { CustomHeader } from "@/src/components";
import { useTheme } from "@/src/hooks";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProfileForm from "./ProfileForm";
import { profileScreenStyles } from "./Styles";

const ProfileScreen: React.FC = () => {
  const { Layout, Colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[Layout.fill, profileScreenStyles.dynamic.container(Colors)]}>
      <CustomHeader
        centerText={t("common:profile.title")}
        leftIcon="Arrow_Left"
        onPressLeft={() => router.back()}
        customStyles={[Layout.screenWithoutFill]}
      />

      <KeyboardAwareScrollView
        style={[Layout.fill]}
        contentContainerStyle={[Layout.flexGrow]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileForm />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ProfileScreen;
