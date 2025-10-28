import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
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
        Gutters.gapXGapRadius,
        createStyles.button(Colors),
        customStyle,
      ]}
    >
      <Text
        style={[
          Fonts.POPPINS_MEDIUM_16,
          createStyles.buttonText(Colors),
          customTextStyle,
        ]}
      >
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Static styles can stay here if any
});

const createStyles = {
  button: (Colors: any) => ({
    height: mS(48),
    backgroundColor: Colors.primary,
  }),
  buttonText: (Colors: any) => ({
    color: Colors.white,
  }),
};

export default CustomButton;
