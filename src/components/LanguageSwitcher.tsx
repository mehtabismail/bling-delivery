import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "../hooks";
import CustomButton from "./CustomButton";

const LanguageSwitcher = () => {
  const { Layout } = useTheme();
  const [language, setLanguage] = useState("en");
  return (
    <View style={[Layout.center, { width: "80%" }]}>
      <CustomButton
        btnText={language == "en" ? "Change to Arabic" : "Change to English"}
        onPress={() => {
          console.log("changing lang");
        }}
      />
    </View>
  );
};

export default LanguageSwitcher;
