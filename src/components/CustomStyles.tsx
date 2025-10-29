/**
 * Custom Components Styles
 * Centralized styling for all custom components
 */

// Static styles that don't depend on theme
export const customPackageCardStyles = {
  static: {
    // No static styles needed currently
  },
  dynamic: {
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
    customerName: (Colors: any, variant?: string) => ({
      color: Colors.text_61605D, // Same color for both variants now
    }),
    addressText: (Colors: any, variant?: string) => ({
      color: Colors.text, // Same color for both variants now
    }),
    destinationText: (Colors: any, variant?: string) => ({
      color: Colors.text,
    }),
  },
};

// Future custom component styles will be added here...
// export const customButtonStyles = { ... };
// export const customHeaderStyles = { ... };
// etc.
