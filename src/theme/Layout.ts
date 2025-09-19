import { StyleSheet } from "react-native";
import { mS } from "../utils/helper";
import { ThemeVariables } from "./theme";
import { Colors } from "./Variables";

export default function ({}: ThemeVariables) {
  return StyleSheet.create({
    /* Column Layouts */
    col: {
      flexDirection: "column",
    },
    colReverse: {
      flexDirection: "column-reverse",
    },
    colCenter: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    colVCenter: {
      flexDirection: "column",
      alignItems: "center",
    },
    colHCenter: {
      flexDirection: "column",
      justifyContent: "center",
    },
    /* Row Layouts */
    row: {
      flexDirection: "row",
    },
    wrap: {
      flexWrap: "wrap",
    },
    rowReverse: {
      flexDirection: "row-reverse",
    },
    rowCenter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    rowVCenter: {
      flexDirection: "row",
      justifyContent: "center",
    },
    rowHCenter: {
      flexDirection: "row",
      alignItems: "center",
    },
    /* Default Layouts */
    center: {
      alignItems: "center",
      justifyContent: "center",
    },
    alignItemsCenter: {
      alignItems: "center",
    },
    alignItemsStart: {
      alignItems: "flex-start",
    },
    alignItemsStretch: {
      alignItems: "stretch",
    },
    alignItemsEnd: {
      alignItems: "flex-end",
    },
    alignSelfCenter: {
      alignSelf: "center",
    },
    justifyContentCenter: {
      justifyContent: "center",
    },
    justifyContentAround: {
      justifyContent: "space-around",
    },
    justifyContentBetween: {
      justifyContent: "space-between",
    },
    justifyContentEvenly: {
      justifyContent: "space-evenly",
    },
    justifyContentEnd: {
      justifyContent: "flex-end",
    },
    scrollSpaceAround: {
      flexGrow: 1,
      justifyContent: "space-around",
    },
    scrollSpaceBetween: {
      flexGrow: 1,
      justifyContent: "space-between",
    },
    selfStretch: {
      alignSelf: "stretch",
    },
    selfStart: {
      alignSelf: "flex-start",
    },
    textAlignCenter: {
      textAlign: "center",
    },
    textAlignRight: {
      textAlign: "right",
    },
    textAlignLeft: {
      textAlign: "left",
    },
    selfCenter: {
      alignSelf: "center",
    },
    selfEnd: {
      alignSelf: "flex-end",
    },
    grow: {
      flexGrow: 1,
    },
    border: {
      borderWidth: 1,
    },

    /* Sizes Layouts */
    fill: {
      flex: 1,
    },
    ["fill_1/2"]: {
      flex: 1 / 2,
    },
    ["fill_1/3"]: {
      flex: 1 / 3,
    },
    ["fill_1/4"]: {
      flex: 1 / 4,
    },
    ["fill_3/4"]: {
      flex: 3 / 4,
    },

    overflow: {
      overflow: "hidden",
    },

    flexWrap: {
      flexWrap: "wrap",
    },
    ["width45"]: { width: "45%" },
    fullSize: {
      height: "100%",
      width: "100%",
    },
    fullWidth: {
      width: "100%",
    },
    halfWidth: {
      width: "50%",
    },
    fullHeight: {
      height: "100%",
    },
    halfHeight: {
      width: "50%",
    },
    screenWidth: {
      width: "94%",
      alignSelf: "center",
    },
    screenHeight: {
      height: "90%",
    },
    height20: {
      height: "20%",
    },
    height30: {
      height: "30%",
    },
    height35: {
      height: "35%",
    },
    height40: {
      height: "40%",
    },
    height80: {
      height: "80%",
    },
    height70: {
      height: "70%",
    },
    width90: {
      width: "90%",
    },
    width80: {
      width: "80%",
    },
    width85: {
      width: "85%",
    },
    width15: {
      width: "15%",
    },
    textUpperCase: {
      textTransform: "uppercase",
    },
    bgColor: {
      backgroundColor: Colors.background,
    },
    screen: {
      paddingHorizontal: mS(15),
      backgroundColor: Colors.background,
      flex: 1,
    },
    screenWithoutFill: {
      paddingHorizontal: mS(15),
    },
    defaultScreen: {
      width: "94%",
      backgroundColor: Colors.background,
      alignSelf: "center",
    },
    /* Operation Layout */
    mirror: {
      transform: [{ scaleX: -1 }],
    },
    rotate90: {
      transform: [{ rotate: "90deg" }],
    },
    rotate180: {
      transform: [{ rotate: "180deg" }],
    },
    rotate90Inverse: {
      transform: [{ rotate: "-90deg" }],
    },
    invertedY: { transform: [{ scaleY: -1 }] },
    invertedX: { transform: [{ scaleX: -1 }] },

    // Position
    relative: {
      position: "relative",
    },
    absolute: {
      position: "absolute",
    },
    top0: {
      top: 0,
    },
    bottom0: {
      bottom: 0,
    },
    left0: {
      left: 0,
    },
    right0: {
      right: 0,
    },
    inset0: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    textTransform: {
      textTransform: "capitalize",
    },
    shadow: {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.21,
      shadowRadius: 7.68,
      elevation: 10,
    },
  });
}
