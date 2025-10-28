import { mS } from "@/src/utils/helper";
import { StyleSheet } from "react-native";

/**
 * Home Screen Styles
 * Centralized styling for all home screen components
 */

// Static styles that don't depend on theme
export const homeStyles = StyleSheet.create({
  // FeaturedPackageCard styles
  featuredCardIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: mS(48),
    height: mS(48),
  },
  featuredCardCustomerName: {
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: mS(18),
  },
  featuredCardStatusBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  featuredCardProgressBarBackground: {
    height: mS(6),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  featuredCardAddressText: {
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: mS(18),
  },
  featuredCardDepartureText: {
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: mS(16),
  },
  featuredCardDepartureDateLabel: {
    paddingTop: mS(20),
    textAlignVertical: "center",
  },
  featuredCardDepartureDateValue: {
    paddingTop: mS(22),
    textAlignVertical: "center",
  },

  // PackageListItem styles
  packageListItemPackageTitle: {
    // No static styles needed for package title
  },
  packageListItemCustomerName: {
    // No static styles needed for customer name
  },
  packageListItemAddressText: {
    // No static styles needed for address text
  },

  // PackageFilters styles would go here
});

// Dynamic styles that depend on theme/props
export const createHomeStyles = {
  // FeaturedPackageCard dynamic styles
  featuredCard: {
    container: (Colors: any) => ({
      backgroundColor: Colors.primary,
    }),
    packageNumber: (Colors: any) => ({
      color: Colors.white,
      lineHeight: mS(22),
    }),
    statusText: (Colors: any) => ({
      color: Colors.white,
      lineHeight: mS(16),
    }),
    progressBarFill: (Colors: any, progress?: number) => ({
      width: `${progress}%`,
      backgroundColor: Colors.white,
    }),
    destinationText: (Colors: any) => ({
      color: Colors.white,
      lineHeight: mS(18),
    }),
  },

  // PackageListItem dynamic styles
  packageListItem: {
    container: (Colors: any) => ({
      backgroundColor: Colors.textinput_background,
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
      color: Colors.text_61605D,
    }),
    addressText: (Colors: any) => ({
      color: Colors.text,
    }),
  },

  // PackageFilters dynamic styles
  packageFilters: {
    filterButton: (Colors: any, isActive: boolean) => ({
      backgroundColor: isActive ? Colors.primary : Colors.background,
      borderColor: isActive ? Colors.primary : Colors.border_primary,
      borderWidth: 1,
    }),
    filterText: (Colors: any, isActive: boolean) => ({
      color: isActive ? Colors.white : Colors.text,
    }),
  },
};

// Export individual component styles for easy access
export const featuredCardStyles = {
  static: {
    iconContainer: homeStyles.featuredCardIconContainer,
    customerName: homeStyles.featuredCardCustomerName,
    statusBadge: homeStyles.featuredCardStatusBadge,
    progressBarBackground: homeStyles.featuredCardProgressBarBackground,
    addressText: homeStyles.featuredCardAddressText,
    departureText: homeStyles.featuredCardDepartureText,
    departureDateLabel: homeStyles.featuredCardDepartureDateLabel,
    departureDateValue: homeStyles.featuredCardDepartureDateValue,
  },
  dynamic: createHomeStyles.featuredCard,
};

export const packageListItemStyles = {
  static: {
    packageTitle: homeStyles.packageListItemPackageTitle,
    customerName: homeStyles.packageListItemCustomerName,
    addressText: homeStyles.packageListItemAddressText,
  },
  dynamic: createHomeStyles.packageListItem,
};

export const packageFiltersStyles = {
  static: {},
  dynamic: createHomeStyles.packageFilters,
};
