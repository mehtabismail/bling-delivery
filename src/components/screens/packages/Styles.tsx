import { StyleSheet } from "react-native";

/**
 * Packages Screen Styles
 * Centralized styling for all packages screen components
 */

// Static styles that don't depend on theme
export const packagesStyles = StyleSheet.create({
  // PackageCard styles would go here if any static styles are needed
  // PackageTabHeader styles would go here if any static styles are needed
});

// Dynamic styles that depend on theme/props
export const createPackagesStyles = {
  // PackageCard dynamic styles
  packageCard: {
    container: (Colors: any) => ({
      backgroundColor: Colors.white,
      shadowColor: Colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
    iconContainer: (Colors: any) => ({
      backgroundColor: Colors.textinput_background,
    }),
    statusBadge: (backgroundColor: string) => ({
      backgroundColor,
    }),
    statusText: (Colors: any) => ({
      color: Colors.white,
    }),
    packageTitle: (Colors: any) => ({
      color: Colors.text,
    }),
    customerName: (Colors: any) => ({
      color: Colors.text_91A8AD,
    }),
  },

  // PackageTabHeader dynamic styles
  packageTabHeader: {
    // Add dynamic tab header styles here
  },
};

// Export individual component styles for easy access
export const packageCardStyles = {
  static: {},
  dynamic: createPackagesStyles.packageCard,
};

export const packageTabHeaderStyles = {
  static: packagesStyles.packageTabHeader,
  dynamic: createPackagesStyles.packageTabHeader,
};
