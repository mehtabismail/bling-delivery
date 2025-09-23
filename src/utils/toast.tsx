import React from "react";
import { Platform } from "react-native";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";
import { Colors } from "../theme/Variables";
import fonts from "../theme/assets/fonts";
import { mS } from "./helper";

/**
 * Custom Toast Configuration
 * Using ToastConfig type from react-native-toast-message
 */
export const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        marginTop: Platform.OS === "ios" ? mS(15) : 0,
        borderLeftColor: Colors.green,
        backgroundColor: Colors.white,
        borderRadius: mS(15),
        zIndex: 999999,
        elevation: 999999,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      text1Style={{
        color: Colors.text,
        fontFamily: fonts.POPPINS_SEMIBOLD,
        fontSize: 14,
      }}
      text2Style={{
        color: Colors.secondary,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 12,
      }}
    />
  ),

  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        marginTop: Platform.OS === "ios" ? mS(15) : 0,
        borderLeftColor: Colors.error,
        backgroundColor: Colors.white,
        borderRadius: mS(15),
        zIndex: 999999,
        elevation: 999999,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      text1Style={{
        color: Colors.primary,
        fontFamily: fonts.POPPINS_SEMIBOLD,
        fontSize: 14,
      }}
      text2Style={{
        color: Colors.text,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 12,
      }}
    />
  ),

  default: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        marginTop: Platform.OS === "ios" ? mS(15) : 0,
        borderLeftColor: Colors.steel_grey,
        backgroundColor: Colors.white,
        borderRadius: mS(15),
        zIndex: 999999,
        elevation: 999999,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      text1Style={{
        color: Colors.text,
        fontFamily: fonts.POPPINS_SEMIBOLD,
        fontSize: 14,
      }}
      text2Style={{
        color: Colors.steel_grey,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 12,
      }}
    />
  ),
};

/**
 * Define parameter types for toast.show convenience wrapper
 */
interface ToastParams {
  type?: "success" | "error" | "default";
  text1?: string;
  text2?: string;
  [key: string]: any; // allow extra props like position, visibilityTime etc.
}

/**
 * Convenience toast function interface
 */
interface ToastFunction {
  (message: string, message2?: string, params?: Partial<ToastParams>): void;
  success: (
    message: string,
    message2?: string,
    params?: Partial<ToastParams>
  ) => void;
  error: (
    message: string,
    message2?: string,
    params?: Partial<ToastParams>
  ) => void;
}

/**
 * Create the toast function with proper typing
 */
const createToastFunction = (): ToastFunction => {
  const defaultParams = {
    visibilityTime: 4000,
    autoHide: true,
    topOffset: Platform.OS === "ios" ? 60 : 40,
    position: "top" as const,
  };

  const toastFn = (
    message: string,
    message2?: string,
    params: Partial<ToastParams> = {}
  ) => {
    Toast.show({
      type: "default",
      text1: message,
      text2: message2,
      ...defaultParams,
      ...params,
    });
  };

  toastFn.success = (
    message: string,
    message2?: string,
    params: Partial<ToastParams> = {}
  ) =>
    Toast.show({
      type: "success",
      text1: message,
      text2: message2,
      ...defaultParams,
      ...params,
    });

  toastFn.error = (
    message: string,
    message2?: string,
    params: Partial<ToastParams> = {}
  ) =>
    Toast.show({
      type: "error",
      text1: message,
      text2: message2,
      ...defaultParams,
      ...params,
    });

  return toastFn;
};

export const toast = createToastFunction();
