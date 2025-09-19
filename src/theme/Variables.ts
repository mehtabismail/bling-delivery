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
  white: "#ffffff",
  white_text: "#F7FAFA",
  background: "#FFFFFF",
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
const mini = mS(2);
const little = mS(5);
const xLittle = mS(8);
const tiny = mS(10);
const gap = mS(12);
const xTiny = mS(15);
const small = tiny * 2; // 20
const medium = mS(25);
const regular = tiny * 3; // 30
const sRegular = mS(35);
const xRegular = mS(40);
const xxRegular = mS(50);
const large = regular * 2; // 60
const xLarge = xRegular * 2; // 60
export const MetricsSizes = {
  mini,
  little,
  xLittle,
  tiny,
  gap,
  xTiny,
  small,
  medium,
  regular,
  sRegular,
  xRegular,
  xxRegular,
  large,
  xLarge,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
