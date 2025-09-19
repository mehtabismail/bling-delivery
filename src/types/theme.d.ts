import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface FontsTheme {
  nunito18: StyleProp<TextStyle>;
  semiboldWeight: StyleProp<TextStyle>;
  PLUSJAKARTASANS_BOLD_18: StyleProp<TextStyle>;
  // add more fonts as needed
}

export interface GuttersTheme {
  tinyVPadding: StyleProp<ViewStyle>;
  tinyHPadding: StyleProp<ViewStyle>;
  // add more gutters as needed
}

export interface LayoutTheme {
  row: StyleProp<ViewStyle>;
  justifyContentBetween: StyleProp<ViewStyle>;
  justifyContentStart: StyleProp<ViewStyle>;
  justifyContentCenter: StyleProp<ViewStyle>;
  justifyContentEnd: StyleProp<ViewStyle>;
  alignItemsCenter: StyleProp<ViewStyle>;
  invertedX?: StyleProp<ViewStyle>;
  // add more layout props as needed
}

export interface ImagesTheme {
  svg: Record<string, { default: React.ComponentType<any> }>;
}

export interface ThemeNavigationColors {
  primary?: string;
  background?: string;
  card?: string;
  text?: string;
  border?: string;
  notification?: string;
  // extend as you need
}

export interface ThemeNavigationTheme {
  dark: boolean;
  colors: ThemeNavigationColors;
}

export interface Theme {
  Fonts: FontsTheme;
  Gutters: GuttersTheme;
  Layout: LayoutTheme;
  Images: ImagesTheme;
  NavigationColors?: ThemeNavigationColors;
  darkMode: boolean;
  NavigationTheme:
    | typeof DefaultTheme
    | typeof DarkTheme
    | ThemeNavigationTheme;
}
