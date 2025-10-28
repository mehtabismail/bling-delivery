import { mS } from "@/src/utils/helper";
import { StyleSheet } from "react-native";

/**
 * Shared Component Styles
 * Centralized styling for shared/common components used across the app
 */

// Static styles that don't depend on theme
export const sharedStyles = StyleSheet.create({
  // CustomButton styles
  customButton: {
    // Add static styles here if any
  },

  // CustomTextInput styles
  customTextInput: {
    // Add static styles here if any
  },

  // CustomHeader styles
  customHeader: {
    // Add static styles here if any
  },
});

// Dynamic styles that depend on theme/props
export const createSharedStyles = {
  // CustomButton dynamic styles
  customButton: {
    button: (Colors: any) => ({
      height: mS(48),
      backgroundColor: Colors.primary,
    }),
    buttonText: (Colors: any) => ({
      color: Colors.white,
    }),
  },

  // CustomTextInput dynamic styles
  customTextInput: {
    // Add dynamic input styles here
  },

  // CustomHeader dynamic styles
  customHeader: {
    // Add dynamic header styles here
  },
};

// Export individual component styles for easy access
export const customButtonStyles = {
  static: sharedStyles.customButton,
  dynamic: createSharedStyles.customButton,
};

export const customTextInputStyles = {
  static: sharedStyles.customTextInput,
  dynamic: createSharedStyles.customTextInput,
};

export const customHeaderStyles = {
  static: sharedStyles.customHeader,
  dynamic: createSharedStyles.customHeader,
};
