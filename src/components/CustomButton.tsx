import React from "react";
import {
  ActivityIndicator,
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
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  btnText,
  customStyle,
  customTextStyle,
  disabled = false,
  loading = false,
}) => {
  const { Layout, Colors, Gutters, Fonts } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => !disabled && !loading && onPress()}
      disabled={disabled || loading}
      style={[
        Layout.fullWidth,
        Layout.center,
        Gutters.gapVMargin,
        // Gutters.darkShadow,
        Gutters.gapXGapRadius,
        createStyles.button(Colors, disabled),
        customStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <Text
          style={[
            Fonts.POPPINS_MEDIUM_16,
            createStyles.buttonText(Colors, disabled),
            customTextStyle,
          ]}
        >
          {btnText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Static styles can stay here if any
});

const createStyles = {
  button: (Colors: any, disabled?: boolean) => ({
    height: mS(48),
    backgroundColor: disabled ? Colors.border_primary : Colors.primary,
    opacity: disabled ? 0.6 : 1,
  }),
  buttonText: (Colors: any, disabled?: boolean) => ({
    color: Colors.white,
    opacity: disabled ? 0.6 : 1,
  }),
};

export default CustomButton;
