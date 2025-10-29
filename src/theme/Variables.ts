/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { mS } from "../utils/helper";
import { ThemeNavigationColors } from "./theme";

/**
 * Colors
 */
export const Colors = {
  transparent: "rgba(0,0,0,0)",
  primary: "#003441",
  primary2: "#2E5963",
  secondary: "#229F82",
  tertiary: "#0D171C",
  text: "#1A1A1A",
  text_91A8AD: "#91A8AD",
  text_00252E: "#00252E",
  text_003441: "#003441",
  text_707480: "#707480",
  text_456B74: "#456B74",
  texxt_666A77: "#666A77",
  text_61605D: "#61605D",
  white: "#ffffff",
  white_text: "#F7FAFA",
  background: "#FFFFFF",
  background_F0F3F4: "#F0F3F4",
  rounded_cirle: "#F5F7F7",
  textinput_background: "#F6F7F7",
  border_primary: "#E6E6E6",
  border_E6EBEC: "#E6EBEC",
  border_D9E1E3: "#D9E1E3",
  border_C2CED1: "#C2CED1",
  placeholder_text: "#91A8AD",
  black: "#000000",
  blur: "#00000090",
  error: "#dc3545",
  red: "#EE1111",
  // Status Colors
  status_waiting: "#9CA3AF",
  status_in_transit: "#D0D0FF",
  status_completed: "#10B981",
  status_canceled: "#EF4444",
  arrow_B7B7B7: "#B7B7B7",
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  // primary: Colors.purple_5B127E,
  background: "#EFEFEF",
  card: "#EFEFEF",
};

/**
 * FontSize
 */
export const FontSize = {
  tiny: mS(14),
  small: mS(16),
  regular: mS(20),
  large: mS(40),
};

/**
 * Metrics Sizes
 */
const nano = mS(1);
const mini = mS(2);
const miniGap = mS(3);
const xMini = mS(4);
const little = mS(5);
const littleXGap = mS(6);
const littleGap = mS(7);
const xLittle = mS(8);
const tiny = mS(10);
const gap = mS(12);
const gapXGap = mS(14);
const xTiny = mS(15);
const xTinyGap = mS(16);
const xTinyXGap = mS(18);
const small = tiny * 2; // 20
const medium = mS(25);
const regular = tiny * 3; // 30
const xLargeXGap = mS(60);
const sRegular = mS(35);
const xRegular = mS(40);
const xxRegular = mS(50);
const large = regular * 2; // 60
const xLarge = xRegular * 2; // 60
export const MetricsSizes = {
  nano,
  mini,
  miniGap,
  xMini,
  little,
  littleXGap,
  littleGap,
  xLittle,
  tiny,
  gap,
  gapXGap,
  xTiny,
  xTinyGap,
  xTinyXGap,
  small,
  medium,
  regular,
  sRegular,
  xRegular,
  xxRegular,
  large,
  xLarge,
  xLargeXGap,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
