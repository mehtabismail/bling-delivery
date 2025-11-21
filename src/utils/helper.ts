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

const truncateWords = (text: string, maxWords: number = 15): string => {
  if (typeof text !== "string") return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

const handleApiError = async (error: any, toastFn?: any) => {
  console.log("API Error response ==>>", JSON.stringify(error));
  console.log(!!error?.error?.data?.message, "error check");

  let errorMessage = "Something went wrong ...";

  if (!!error?.error?.data?.message) {
    console.log("paassed this error");
    errorMessage = error?.error?.data?.message;
  } else if (
    error?.error?.data?.error?.includes(
      "(3581516) is more than maximum allowed value (1048576)"
    )
  ) {
    errorMessage = "Error: File size more than 1 mb";
  } else if (error?.error?.data?.message) {
    console.log("passed last ");
    errorMessage = error?.error?.data?.message;
  }

  if (toastFn && typeof toastFn.error === "function") {
    toastFn.error(errorMessage);
  } else {
    console.error("Toast function not provided or invalid:", errorMessage);
  }
};

const getStatusColor = (status: string, Colors: any) => {
  switch (status) {
    case "waiting":
      return Colors.status_waiting;
    case "in_transit":
      return Colors.status_in_transit;
    case "completed":
      return Colors.status_completed;
    case "canceled":
      return Colors.status_canceled;
    default:
      return Colors.status_waiting;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "waiting":
      return "Waiting";
    case "in_transit":
      return "In Transit";
    case "completed":
      return "Completed";
    case "canceled":
      return "Canceled";
    default:
      return "Waiting";
  }
};

export {
  getStatusColor,
  getStatusText,
  handleApiError,
  hS,
  mS,
  sHight,
  sWidth,
  truncate,
  truncateWords,
  vS,
  windowHeight,
  windowWidth,
};
