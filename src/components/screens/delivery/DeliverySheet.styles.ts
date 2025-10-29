import { mS } from "@/src/utils/helper";
import { StyleSheet } from "react-native";

export const createDeliverySheetStyles = (
  Colors: any,
  insets: { bottom: number }
) =>
  StyleSheet.create({
    bottomSheet: {
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: "60%",
      backgroundColor: Colors.background,
      borderTopLeftRadius: mS(24),
      borderTopRightRadius: mS(24),
      paddingHorizontal: mS(10),
      paddingTop: mS(10),
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 6,
    },
    dragHandle: {
      alignSelf: "center",
      width: mS(44),
      height: mS(5),
      borderRadius: mS(3),
      backgroundColor: Colors.border_primary,
      marginBottom: mS(10),
    },
  });
