import { CustomButton, CustomTextInput } from "@/src/components";
import { useTheme } from "@/src/hooks";
import { useUpdateUserPasswordMutation } from "@/src/services/user/userApi";
import { showToast } from "@/src/utils/toast";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const ChangePasswordForm: React.FC = () => {
  const { Layout, Colors, Gutters } = useTheme();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirm: false,
  });

  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdateUserPasswordMutation();

  const handleChangeInput = (value: string, fieldName?: string) => {
    if (!fieldName) return;

    setForm((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev: any) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const togglePasswordVisibility = (field: "password" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    const requiredMessage = t("common:errors.required_field", "Required");

    if (!form.password.trim()) {
      newErrors.password = requiredMessage;
    }
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = requiredMessage;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors({
        confirmPassword: t(
          "common:errors.passwords_dont_match",
          "Passwords do not match"
        ),
      });
      return;
    }

    try {
      const response = await updatePassword({
        password: form.password,
        confirmPassword: form.confirmPassword,
      }).unwrap();

      showToast({
        type: "success",
        text1:
          response?.message ||
          t("common:change_password.success", "Password updated successfully"),
      });

      setForm({
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        t("common:errors.something_went_wrong", "Something went wrong");

      showToast({
        type: "error",
        text1: t("common:change_password.failed", "Password update failed"),
        text2: errorMessage,
      });
    }
  };

  return (
    <View style={[Layout.fill, Layout.screenWithoutFill]}>
      {/* Form Fields */}
      <View style={[Gutters.largeTMargin]}>
        <CustomTextInput
          headingText={t("common:change_password.new_password")}
          placeholder={t("common:profile.choose_one")}
          value={form.password}
          fieldName="password"
          handleChangeInput={handleChangeInput}
          keyboardType="default"
          type="text"
          secureTextEntry={!showPasswords.password}
          rightIcon={showPasswords.password ? "Eye_Open" : "Eye_Close"}
          onPressRight={() => togglePasswordVisibility("password")}
          error={errors.password}
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
          loading={isUpdatingPassword}
          disabled={isUpdatingPassword}
        />
      </View>
    </View>
  );
};

export default ChangePasswordForm;
