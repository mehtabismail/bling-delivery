import {
  CustomButton,
  CustomTextInput,
  CustomTextView,
  ScreenWrapper,
} from "@/src/components";
import { useTheme } from "@/src/hooks";
import { useLoginMutation } from "@/src/services/auth";
import { signInSchema } from "@/src/utils/errorSchema";
import React, { useState } from "react";
import { View } from "react-native";

interface FormErrors {
  email?: string;
  password?: string;
}

const Signin = () => {
  const { Colors, Fonts, Gutters } = useTheme();
  const [login] = useLoginMutation();

  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<any>({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const handleChangeInput = (value: string, fieldname?: string) => {
    if (fieldname && fieldname in form) {
      setForm((prev: any) => ({ ...prev, [fieldname]: value }));
      setErrors((prev) => ({ ...prev, [fieldname]: "" }));
    }
  };

  const handleSubmit = async () => {
    console.log(form, "checing form ...");
    try {
      // Validate entire form
      await signInSchema.validate(form, { abortEarly: false });

      // If valid, clear errors and proceed with login
      setErrors({});
      console.log("Form is valid:", form);
      let apiData = {
        loading: true,
        data: {
          userNameOrEmail: form.email,
          password: form.password,
          client: "DELIVERY",
        },
      };
      // Call login API
      await login(apiData);
    } catch (err: any) {
      if (err.inner) {
        // Collect all errors in an object
        const formErrors: FormErrors = {};
        err.inner.forEach((e: any) => {
          if (!formErrors[e.path as keyof FormErrors]) {
            formErrors[e.path as keyof FormErrors] = e.message;
          }
        });
        setErrors(formErrors);
      } else {
        // Handle generic error
        console.error(err);
      }
    }
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
          fieldName='email'
          headingText='User Name/email'
          handleChangeInput={handleChangeInput}
          keyboardType='default'
          type='text'
          error={errors.email}
        />
        <CustomTextInput
          placeholder='Password'
          value={form.password}
          fieldName='password'
          headingText='Password'
          handleChangeInput={handleChangeInput}
          keyboardType='default'
          type='text'
          secureTextEntry={!showPass}
          rightIcon={showPass ? "Eye_Open" : "Eye_Close"}
          onPressRight={() => setShowPass(!showPass)}
          error={errors.password}
        />
      </View>

      <CustomButton
        customStyle={[
          Gutters.largeTMargin,
          { backgroundColor: Colors.primary },
        ]}
        btnText='Sign in'
        onPress={handleSubmit}
      />
    </ScreenWrapper>
  );
};

export default Signin;
