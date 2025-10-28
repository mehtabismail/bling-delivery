import { CustomButton, CustomTextInput } from "@/src/components";
import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import { mockUserProfile } from "@/src/utils/mockData";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const ProfileForm: React.FC = () => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    firstName: mockUserProfile.firstName,
    lastName: mockUserProfile.lastName,
    email: mockUserProfile.email,
    phoneNumber: mockUserProfile.phoneNumber,
  });

  const [errors, setErrors] = useState<any>({});

  const handleChangeInput = (value: string, fieldName?: string) => {
    if (fieldName) {
      setForm((prev) => ({ ...prev, [fieldName]: value }));
      if (errors[fieldName]) {
        setErrors((prev: any) => ({ ...prev, [fieldName]: "" }));
      }
    }
  };

  const handleSubmit = () => {
    // Add form validation logic here
    console.log("Profile updated:", form);
  };

  return (
    <View style={[Layout.fill]}>
      {/* Profile Image Section */}
      <View
        style={[Layout.center, Gutters.largeTMargin, Gutters.regularBMargin]}
      >
        <View style={styles.avatarWrapper}>
          <View
            style={[
              Layout.center,
              Layout.overflow,
              Gutters.xLargeXGapRadius,
              createStyles.avatarContainer(Colors),
            ]}
          >
            {mockUserProfile.avatar ? (
              <Image
                source={{ uri: mockUserProfile.avatar }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <Images.svg.Profile.default
                width={mS(60)}
                height={mS(60)}
                fill={Colors.text_91A8AD}
              />
            )}
          </View>

          {/* Edit Icon */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={[
              Layout.absolute,
              Layout.bottom0,
              Layout.right0,
              Layout.center,
              Gutters.xTinyGapRadius,
              createStyles.editButton(Colors),
            ]}
          >
            <Images.svg.Edit.default
              width={mS(14)}
              height={mS(14)}
              fill={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Fields */}
      <View style={[Layout.screenWithoutFill]}>
        <CustomTextInput
          headingText={t("common:profile.first_name")}
          placeholder={t("common:profile.choose_one")}
          value={form.firstName}
          fieldName="firstName"
          handleChangeInput={handleChangeInput}
          keyboardType="default"
          type="text"
          error={errors.firstName}
        />

        <CustomTextInput
          headingText={t("common:profile.last_name")}
          placeholder={t("common:profile.choose_one")}
          value={form.lastName}
          fieldName="lastName"
          handleChangeInput={handleChangeInput}
          keyboardType="default"
          type="text"
          error={errors.lastName}
        />

        <CustomTextInput
          headingText={t("common:profile.email_address")}
          placeholder={t("common:profile.choose_one")}
          value={form.email}
          fieldName="email"
          handleChangeInput={handleChangeInput}
          keyboardType="email-address"
          type="text"
          error={errors.email}
        />

        <CustomTextInput
          headingText={t("common:profile.phone_number")}
          placeholder={t("common:profile.enter_full_address")}
          value={form.phoneNumber}
          fieldName="phoneNumber"
          handleChangeInput={handleChangeInput}
          keyboardType="phone-pad"
          type="text"
          error={errors.phoneNumber}
        />
      </View>

      {/* Apply Button */}
      <View style={[Layout.screenWithoutFill, Gutters.largeTMargin]}>
        <CustomButton
          btnText={t("common:apply")}
          onPress={handleSubmit}
          customStyle={[{ backgroundColor: Colors.primary }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    position: "relative",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
});

const createStyles = {
  avatarContainer: (Colors: any) => ({
    width: mS(120),
    height: mS(120),
    backgroundColor: Colors.textinput_background,
  }),
  editButton: (Colors: any) => ({
    backgroundColor: Colors.primary,
    width: mS(32),
    height: mS(32),
    borderWidth: 3,
    borderColor: Colors.white,
  }),
};

export default ProfileForm;
