import {
  CustomButton,
  CustomTextInput,
  CustomTextView,
  ScreenWrapper,
} from "@/src/components";
import { useTheme } from "@/src/hooks";
import { useAppDispatch } from "@/src/hooks/useRedux";
import { storeToken } from "@/src/store/auth/AuthSlice";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

const Signin = () => {
  const { Colors, Fonts, Gutters } = useTheme();

  const dispatch = useAppDispatch();

  const [form, setForm] = useState<any>({
    email: "",
    username: "",
    password: "",
  });

  const handleChangeInput = (value: string, fieldname: any) => {
    setForm((prev: any) => ({ ...prev, [fieldname]: value }));
  };

  return (
    <ScreenWrapper>
      <CustomTextView
        customStyle={[Gutters.xLargeTPadding]}
        text={t("signin.heading")}
        authHeading={true}
      />
      <CustomTextView
        customStyle={[Gutters.xLargeBPadding, Fonts.POPPINS_REGULAR_15]}
        text={t("signin.sub-heading")}
      />

      <View>
        <CustomTextInput
          placeholder='Username'
          // value={formData.current.username}
          value={form.username}
          fieldName='username'
          headingText='User Name/email'
          handleChangeInput={handleChangeInput}
          keyboardType='default'
          type='text'
        />
        <CustomTextInput
          secureTextEntry={true}
          placeholder='Password'
          value={form.password}
          fieldName='password'
          headingText='Password'
          handleChangeInput={handleChangeInput}
          keyboardType='default'
          type='text'
        />
      </View>

      <CustomButton
        customStyle={[
          Gutters.largeTMargin,
          { backgroundColor: Colors.primary },
        ]}
        btnText='Sign in'
        onPress={() => {
          dispatch(storeToken("123"));
          router.replace("/(app)/(tabs)");
        }}
      />
    </ScreenWrapper>
  );
};

export default Signin;
