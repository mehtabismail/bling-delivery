import { Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

// screen height in percentage
const sHight = (val: number) => {
  return (val / 100) * windowHeight;
};

// screen width in percentage
const sWidth = (val: number) => {
  return (val / 100) * windowWidth;
};

// horizontal scale
const hS = (size: number) => {
  return scale(size);
};

// verticle scale
const vS = (size: number) => {
  return verticalScale(size);
};

// moderate scale
const mS = (size: number, factor?: number) => {
  return moderateScale(size * 0.9, factor);
};

const truncate = (text: string, maxLength: number): string => {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
};

export { hS, mS, sHight, sWidth, truncate, vS, windowHeight, windowWidth };
