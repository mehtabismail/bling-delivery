import { mS } from "@/src/utils/helper";
import { StyleSheet } from "react-native";

/**
 * Account Screen Styles
 * Centralized styling for all account screen components
 */

// Static styles that don't depend on theme
export const accountStyles = StyleSheet.create({
  // PromoCard styles
  promoCard: {
    // Add static styles here if any
  },

  // ProfileForm styles
  profileForm: {
    avatarWrapper: {
      position: "relative" as const,
    },
    avatarImage: {
      width: "100%" as const,
      height: "100%" as const,
    },
  },

  // MenuList styles
  menuList: {
    // Add static styles here if any
  },
});

// Dynamic styles that depend on theme/props
export const createAccountStyles = {
  // ProfileScreen dynamic styles
  profileScreen: {
    container: (Colors: any) => ({
      backgroundColor: Colors.background,
    }),
  },

  // ChangePasswordScreen dynamic styles (same as ProfileScreen)
  changePasswordScreen: {
    container: (Colors: any) => ({
      backgroundColor: Colors.background,
    }),
  },

  // PromoCard dynamic styles
  promoCard: {
    container: (Colors: any) => ({
      backgroundColor: Colors.primary,
    }),
    title: (Colors: any) => ({
      color: Colors.white,
      lineHeight: mS(24),
    }),
    button: (Colors: any) => ({
      backgroundColor: Colors.white + "30",
    }),
    buttonText: (Colors: any) => ({
      color: Colors.white,
    }),
    iconCircle: (Colors: any) => ({
      backgroundColor: Colors.white + "20",
      width: mS(80),
      height: mS(80),
    }),
    subtitle: (Colors: any) => ({
      color: Colors.white,
    }),
  },

  // ProfileForm dynamic styles
  profileForm: {
    avatarContainer: (Colors: any) => ({
      width: mS(120),
      height: mS(120),
      backgroundColor: Colors.textinput_background,
    }),
    editButton: (Colors: any) => ({
      backgroundColor: Colors.primary,
      width: mS(32),
      height: mS(32),
      borderWidth: 3,
      borderColor: Colors.white,
    }),
  },

  // MenuList dynamic styles (if any)
  menuList: {
    // Add dynamic menu styles here
  },
};

// Export individual component styles for easy access
export const promoCardStyles = {
  static: accountStyles.promoCard,
  dynamic: createAccountStyles.promoCard,
};

export const profileFormStyles = {
  static: accountStyles.profileForm,
  dynamic: createAccountStyles.profileForm,
};

export const menuListStyles = {
  static: accountStyles.menuList,
  dynamic: createAccountStyles.menuList,
};

export const profileScreenStyles = {
  static: {},
  dynamic: createAccountStyles.profileScreen,
};

export const changePasswordScreenStyles = {
  static: {},
  dynamic: createAccountStyles.changePasswordScreen,
};
