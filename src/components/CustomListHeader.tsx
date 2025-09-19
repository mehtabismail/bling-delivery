import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { mS } from "../utils/helper";
import { ListHeaderProp } from "./types";

const CustomListHeader: React.FC<ListHeaderProp> = ({ data }) => {
  const { Layout, Images, Gutters, Colors, Fonts } = useTheme();

  //   const LIcon = leftIcon ? Images.svg[leftIcon].default : null;
  //   const CIcon = centerIcon ? Images.svg[centerIcon].default : null;
  //   const RIcon = rightIcon ? Images.svg[rightIcon].default : null;

  return (
    <View
      style={[
        Layout.row,
        Layout.justifyContentBetween,
        Layout.alignItemsCenter,
        Gutters.tinyTMargin,
        Gutters.xTinyBMargin,
        { height: mS(24) },
      ]}
    >
      <View
        style={[
          Layout.justifyContentStart,
          Layout.row,
          Layout.alignItemsCenter,
        ]}
      >
        {data?.left?.map((item, index) => {
          if (item.onPress) {
            const Icon = item?.icon ? Images.svg[item?.icon].default : null;
            // clickable text
            return (
              <TouchableOpacity
                style={[Gutters.xLittleRPadding]}
                key={index}
                onPress={item.onPress}
              >
                {item?.icon ? (
                  <View style={item?.iconStyle}>
                    <Icon />
                  </View>
                ) : (
                  <Text style={[Fonts.POPPINS_SEMIBOLD_17, item?.textStyle]}>
                    {item.text}
                  </Text>
                )}
              </TouchableOpacity>
            );
          }
          // normal text
          return (
            <Text
              key={index}
              style={[
                Gutters.xLittleRPadding,
                Fonts.POPPINS_SEMIBOLD_17,
                { color: Colors.text },
                item?.textStyle,
              ]}
            >
              {item.text}
            </Text>
          );
        })}
      </View>

      <View
        style={[Layout.justifyContentEnd, Layout.row, Layout.alignItemsCenter]}
      >
        {data?.right?.map((item, index) => {
          if (item.onPress) {
            // clickable text
            const Icon = item?.icon ? Images.svg[item?.icon].default : null;
            return (
              <TouchableOpacity
                style={[Gutters.xLittleLPadding]}
                key={index}
                onPress={item.onPress}
              >
                {item?.icon ? (
                  <View style={item?.iconStyle}>
                    <Icon />
                  </View>
                ) : (
                  <Text
                    style={[
                      Fonts.POPPINS_MEDIUM_13,
                      { color: Colors.priamry },
                      item?.textStyle,
                    ]}
                  >
                    {item.text}
                  </Text>
                )}
              </TouchableOpacity>
            );
          }

          // normal text
          return (
            <Text
              key={index}
              style={[
                Gutters.xLittleLPadding,
                Fonts.POPPINS_MEDIUM_13,
                { color: Colors.priamry },
                item?.textStyle,
              ]}
            >
              {item.text}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

export default CustomListHeader;

const styles = StyleSheet.create({});
