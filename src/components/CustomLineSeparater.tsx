import React, { FC } from "react";
import { View } from "react-native";
import { useTheme } from "../hooks";

const CustomLineSeparater: FC<any> = ({ customStyle }) => {
  const { Layout, Gutters, Colors } = useTheme();
  return (
    <View
      style={[
        Layout.fullWidth,
        Gutters.gapVMargin,
        Gutters.borderBWidth,
        { borderColor: "#222222" },
        customStyle,
      ]}
    />
  );
};

export default CustomLineSeparater;
