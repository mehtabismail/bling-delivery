import React from "react";
import {
  I18nManager,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../hooks";
import { mS } from "../utils/helper";

export interface CustomTextInputProps extends TextInputProps {
  headingText?: string;
  customHeadingTextStyle?: StyleProp<TextStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  customStyle?: StyleProp<TextStyle>;
  leftIcon?: keyof typeof import("../theme").Images.svg | any;
  rightIcon?: keyof typeof import("../theme").Images.svg | any;
  placeholderTextColor?: string;
  handleChangeInput?: (value: string, fieldName?: string) => void;
  fieldName?: string;
  customContainerStyle?: StyleProp<ViewStyle>;
  type: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  const { Layout, Gutters, Colors, Fonts, Images } = useTheme();

  // Pick icons based on RTL state
  const actualLeftIcon = I18nManager.isRTL ? props.rightIcon : props.leftIcon;
  const actualRightIcon = I18nManager.isRTL ? props.leftIcon : props.rightIcon;

  const LIcon = actualLeftIcon ? Images.svg[actualLeftIcon]?.default : null;
  const RIcon = actualRightIcon ? Images.svg[actualRightIcon]?.default : null;

  return (
    <View style={[Gutters.tinyVPadding, props?.wrapperStyle]}>
      {props?.headingText && (
        <View style={[Gutters.tinyBMargin]}>
          <Text
            style={[Fonts.POPPINS_REGULAR_13, props.customHeadingTextStyle]}
          >
            {props?.headingText}
          </Text>
        </View>
      )}

      <View
        style={[
          Layout.row,
          Gutters.input,
          props?.customContainerStyle,
          I18nManager.isRTL ? styles.containerRTL : styles.containerLTR,
        ]}
      >
        {/* Left Icon */}
        {LIcon && (
          <View
            style={{
              justifyContent: "center",
              paddingHorizontal: mS(10),
            }}
          >
            <LIcon width={mS(25)} height={mS(25)} />
          </View>
        )}

        {/* Text Input */}
        <TextInput
          {...props}
          placeholderTextColor={
            props?.placeholderTextColor
              ? props.placeholderTextColor
              : Colors.placeholder_text
          }
          onChangeText={(value) => {
            props?.handleChangeInput?.(value, props?.fieldName);
          }}
          style={[
            Layout.fill,
            Gutters.tinyHPadding,
            Fonts.POPPINS_REGULAR_15,
            I18nManager.isRTL
              ? { writingDirection: "rtl", textAlign: "right" }
              : { writingDirection: "ltr", textAlign: "left" },
            props.customStyle,
          ]}
        />

        {/* Right Icon */}
        {RIcon && (
          <View
            style={{
              justifyContent: "center",
              paddingHorizontal: mS(10),
            }}
          >
            <RIcon width={mS(25)} height={mS(25)} />
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  containerRTL: {
    flexDirection: "row-reverse",
  },
  containerLTR: {
    flexDirection: "row",
  },
});
