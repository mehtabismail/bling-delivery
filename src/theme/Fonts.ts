/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from "react-native";
import { mS } from "../utils/helper";
import fonts from "./assets/fonts";
import { ThemeVariables } from "./theme";
export default function ({ Colors }: ThemeVariables) {
  return StyleSheet.create({
    POPPINS_SEMIBOLD_36: {
      fontFamily: fonts.POPPINS_SEMIBOLD,
      fontSize: mS(36),
      color: Colors.text,
    },
    PLAYFAIR_BOLD_28: {
      fontFamily: fonts.PLAYFAIR_BOLD,
      fontSize: mS(28),
      color: Colors.text,
    },
    POPPINS_BOLD_22: {
      fontFamily: fonts.POPPINS_BOLD,
      fontSize: mS(22),
      lineHeight: mS(28),
      color: Colors.text,
    },
    PLAYFAIR_REGULAR_22: {
      fontFamily: fonts.PLAYFAIR_BOLD,
      fontSize: mS(22),
      color: Colors.text,
    },
    POPPINS_BOLD_18: {
      fontFamily: fonts.POPPINS_BOLD,
      fontSize: mS(18),
      lineHeight: mS(23),
      color: Colors.text,
    },
    POPPINS_SEMIBOLD_17: {
      fontFamily: fonts.POPPINS_SEMIBOLD,
      fontSize: mS(17),
      color: Colors.text,
    },
    POPPINS_MEDIUM_17: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(17),
      color: Colors.text,
    },
    POPPINS_REGULAR_17: {
      fontFamily: fonts.POPPINS_REGULAR,
      fontSize: mS(17),
      color: Colors.text,
    },
    POPPINS_BOLD_16: {
      fontFamily: fonts.POPPINS_BOLD,
      fontSize: mS(16),
      lineHeight: mS(24),
      color: Colors.white_text,
    },
    POPPINS_LIGHT_13: {
      fontFamily: fonts.POPPINS_LIGHT,
      fontSize: mS(13),
      color: Colors.text,
    },
    POPPINS_MEDIUM_13: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(13),
      color: Colors.text,
    },
    POPPINS_REGULAR_13: {
      fontFamily: fonts.POPPINS_REGULAR,
      fontSize: mS(13),
      color: Colors.text,
    },
    POPPINS_REGULAR_14: {
      fontFamily: fonts.POPPINS_REGULAR,
      fontSize: mS(14),
      color: Colors.text,
    },
    PLAYFAIR_REGULAR_14: {
      fontFamily: fonts.PLAYFAIR_REGULAR,
      fontSize: mS(14),
      color: Colors.text,
    },
    POPPINS_REGULAR_15: {
      fontFamily: fonts.POPPINS_REGULAR,
      fontSize: mS(15),
      color: Colors.text,
    },
    POPPINS_REGULAR_16: {
      fontFamily: fonts.POPPINS_REGULAR,
      fontSize: mS(16),
      lineHeight: mS(24),
      color: Colors.text,
    },
    POPPINS_MEDIUM_15: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(15),
      color: Colors.text_91A8AD,
    },
    POPPINS_LIGHT_15: {
      fontFamily: fonts.POPPINS_LIGHT,
      fontSize: mS(15),
      color: Colors.text_91A8AD,
    },
    POPPINS_LIGHT_16: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(16),
      lineHeight: mS(24),
      color: Colors.text,
    },
    POPPINS_SEMIBOLD_21: {
      fontFamily: fonts.POPPINS_SEMIBOLD,
      fontSize: mS(21),
      color: Colors.text,
    },
    POPPINS_SEMIBOLD_16: {
      fontFamily: fonts.POPPINS_SEMIBOLD,
      fontSize: mS(16),
      lineHeight: mS(24),
      color: Colors.text,
    },
    POPPINS_MEDIUM_20: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(20),
      color: Colors.text,
    },
    POPPINS_MEDIUM_24: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(24),
      color: Colors.text,
    },
    POPPINS_MEDIUM_18: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(18),
      color: Colors.text,
    },
    POPPINS_MEDIUM_16: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(16),
      color: Colors.text,
    },
    POPPINS_BOLD_14: {
      fontFamily: fonts.POPPINS_BOLD,
      fontSize: mS(14),
      lineHeight: mS(21),
      color: Colors.secondary,
    },
    POPPINS_SEMIBOLD_14: {
      fontFamily: fonts.POPPINS_SEMIBOLD,
      fontSize: mS(14),
      lineHeight: mS(21),
      color: Colors.text,
    },
    POPPINS_MEDIUM_14: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(14),
      lineHeight: mS(21),
      color: Colors.secondary,
    },

    POPPINS_BOLD_13: {
      fontFamily: fonts.POPPINS_BOLD,
      fontSize: mS(13),
      lineHeight: mS(20),
      color: Colors.white_text,
    },
    POPPINS_SEMIBOLD_12: {
      fontFamily: fonts.POPPINS_SEMIBOLD,
      fontSize: mS(12),
      color: Colors.text,
    },
    POPPINS_MEDIUM_12: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(12),
      lineHeight: mS(18),
      color: Colors.text,
    },
    POPPINS_REGULAR_12: {
      fontFamily: fonts.POPPINS_REGULAR,
      fontSize: mS(12),
      color: Colors.text,
    },
    POPPINS_LIGHT_11: {
      fontFamily: fonts.POPPINS_LIGHT,
      fontSize: mS(11),
      color: Colors.text,
    },
    POPPINS_MEDIUM_11: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(11),
      color: Colors.text,
    },
    POPPINS_MEDIUM_10: {
      fontFamily: fonts.POPPINS_MEDIUM,
      fontSize: mS(10),
      color: Colors.text,
    },
    boldWeight: {
      fontWeight: "bold",
    },
    lightWeight: {
      fontWeight: "200",
    },
    regularWeight: { fontWeight: "400" },
    mediumWeight: { fontWeight: "600" },
    semiboldWeight: { fontWeight: "700" },
    textCapitalize: {
      textTransform: "capitalize",
    },
    textUppercase: {
      textTransform: "uppercase",
    },
    textCenter: {
      textAlign: "center",
    },
    textJustify: {
      textAlign: "justify",
    },
    textLeft: {
      textAlign: "left",
    },
    textRight: {
      textAlign: "right",
    },
    textError: {
      color: Colors.error,
    },
    textPrimary: {
      color: Colors.primary,
    },
    textLobster: {
      fontFamily: "lobster",
      fontWeight: "normal",
    },
  });
}
