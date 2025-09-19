import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "../hooks";
import { mS } from "../utils/helper";

export interface CustomButtonProps {
  /** Button press callback */
  onPress: (event?: GestureResponderEvent) => void;
  /** Text to display inside the button */
  btnText: string;
  /** Optional custom style for button container */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional custom style for button text */
  customTextStyle?: StyleProp<TextStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  btnText,
  customStyle,
  customTextStyle,
}) => {
  const { Layout, Colors, Gutters, Fonts } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress()}
      style={[
        Layout.fullWidth,
        Layout.center,
        Gutters.gapVMargin,
        // Gutters.darkShadow,
        {
          height: mS(48),
          borderRadius: mS(14),
          backgroundColor: Colors.primary,
        },
        customStyle,
      ]}
    >
      <Text
        style={[
          Fonts.POPPINS_MEDIUM_16,
          { color: Colors.white },
          customTextStyle,
        ]}
      >
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
