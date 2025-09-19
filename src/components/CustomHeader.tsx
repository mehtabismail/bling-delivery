import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { mS } from "../utils/helper";
import { CustomHeaderProps } from "./types";

const CustomHeader: React.FC<CustomHeaderProps> = ({
  rightIcon,
  leftIcon,
  centerIcon,
  centerText,
  rightInvertedX,
  leftInvertedX,
  onPressLeft,
  onPressRight,
  RightIconComponnet,
  customStyles,
  backButton,
  leftText,
  onBackPress,
}: CustomHeaderProps) => {
  const { Layout, Images, Gutters, Colors, Fonts } = useTheme();

  const LIcon = leftIcon ? Images.svg[leftIcon].default : null;
  const CIcon = centerIcon ? Images.svg[centerIcon].default : null;
  const RIcon = rightIcon ? Images.svg[rightIcon].default : null;

  return (
    <View
      style={[
        Layout.row,
        Layout.justifyContentBetween,
        Layout.alignItemsCenter,
        { height: mS(70) },
        customStyles,
      ]}
    >
      <View style={[Layout.justifyContentStart, Layout.row, { width: "20%" }]}>
        {backButton ? (
          <TouchableOpacity
            style={[Gutters.tinyVPadding, Gutters.tinyHPadding]}
            onPress={() => {
              !!onBackPress ? onBackPress() : router.back();
            }}
          >
            <Images.svg.Arrow_Left.default />
          </TouchableOpacity>
        ) : leftText ? (
          <View>
            <Text style={[Fonts.POPPINS_MEDIUM_20, { color: Colors.white }]}>
              {leftText}
            </Text>
          </View>
        ) : (
          <>
            {leftIcon && (
              <TouchableOpacity
                onPress={() => onPressLeft && onPressLeft()}
                style={[leftInvertedX && Layout.invertedX]}
              >
                <LIcon />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <View style={[Layout.justifyContentCenter, Layout.row, { width: "60%" }]}>
        {centerIcon ? (
          <CIcon />
        ) : (
          centerText && (
            <Text style={[Fonts.POPPINS_MEDIUM_20]}>{centerText}</Text>
          )
        )}
      </View>

      <View style={[Layout.justifyContentEnd, Layout.row, { width: "20%" }]}>
        {RIcon && (
          <TouchableOpacity
            onPress={() => onPressRight && onPressRight()}
            style={[leftInvertedX && Layout.invertedX]}
          >
            <RIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
