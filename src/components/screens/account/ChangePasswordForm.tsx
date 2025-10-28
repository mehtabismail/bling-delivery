import { CustomButton, CustomTextInput } from "@/src/components";
import { useTheme } from "@/src/hooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const ChangePasswordForm: React.FC = () => {
  const { Layout, Colors, Gutters } = useTheme();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleChangeInput = (value: string, fieldName: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev: any) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = () => {
    // Add password validation logic here
    if (form.newPassword !== form.confirmPassword) {
      setErrors({ confirmPassword: t("common:errors.passwords_dont_match") });
      return;
    }

    console.log("Password change requested:", {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    });
  };

  return (
    <View style={[Layout.fill, Layout.screenWithoutFill]}>
      {/* Form Fields */}
      <View style={[Gutters.largeTMargin]}>
        <CustomTextInput
          headingText={t("common:change_password.old_password")}
          placeholder={t("common:profile.choose_one")}
          value={form.oldPassword}
          fieldName="oldPassword"
          handleChangeInput={handleChangeInput}
          keyboardType="default"
          type="text"
          secureTextEntry={!showPasswords.old}
          rightIcon={showPasswords.old ? "Eye_Open" : "Eye_Close"}
          onPressRight={() => togglePasswordVisibility("old")}
          error={errors.oldPassword}
        />

        <CustomTextInput
          headingText={t("common:change_password.new_password")}
          placeholder={t("common:profile.choose_one")}
          value={form.newPassword}
          fieldName="newPassword"
          handleChangeInput={handleChangeInput}
          keyboardType="default"
          type="text"
          secureTextEntry={!showPasswords.new}
          rightIcon={showPasswords.new ? "Eye_Open" : "Eye_Close"}
          onPressRight={() => togglePasswordVisibility("new")}
          error={errors.newPassword}
        />

        <CustomTextInput
          headingText={t("common:change_password.confirm_new_password")}
          placeholder={t("common:profile.choose_one")}
          value={form.confirmPassword}
          fieldName="confirmPassword"
          handleChangeInput={handleChangeInput}
          keyboardType="default"
          type="text"
          secureTextEntry={!showPasswords.confirm}
          rightIcon={showPasswords.confirm ? "Eye_Open" : "Eye_Close"}
          onPressRight={() => togglePasswordVisibility("confirm")}
          error={errors.confirmPassword}
        />
      </View>

      {/* Apply Button */}
      <View style={[Gutters.largeTMargin]}>
        <CustomButton
          btnText={t("common:apply")}
          onPress={handleSubmit}
          customStyle={[{ backgroundColor: Colors.primary }]}
        />
      </View>
    </View>
  );
};

export default ChangePasswordForm;
