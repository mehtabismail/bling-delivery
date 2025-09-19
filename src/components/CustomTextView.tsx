import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { TextViewProps } from "./types";

const CustomTextView: React.FC<TextViewProps> = ({
  text,
  customStyle,
  customTextStyle,
  authHeading,
  multipleTextLine,
}) => {
  const { Layout, Fonts, Colors, Gutters } = useTheme();
  if (authHeading) {
    return (
      <View style={[customStyle]}>
        <Text style={[Fonts.POPPINS_SEMIBOLD_36, customTextStyle]}>{text}</Text>
      </View>
    );
  }
  if (multipleTextLine) {
    return (
      <View style={[customStyle]}>
        {Object.keys(multipleTextLine).map((lineKey) => (
          <View
            key={lineKey}
            style={{ flexDirection: "row", flexWrap: "wrap" }}
          >
            {/* Loop over each item inside line */}
            {multipleTextLine[lineKey as keyof typeof multipleTextLine].map(
              (item: any, idx: number) => {
                if (item.onPress) {
                  // clickable text
                  return (
                    <TouchableOpacity key={idx} onPress={item.onPress}>
                      <Text
                        style={[
                          Fonts.POPPINS_REGULAR_14,
                          Gutters.miniTPadding,
                          customTextStyle,
                          { color: Colors.secondary },
                          item?.textStyle,
                        ]}
                      >
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  );
                }
                // normal text
                return (
                  <Text
                    key={idx}
                    style={[
                      Fonts.POPPINS_REGULAR_14,
                      Gutters.miniTPadding,
                      { color: Colors.text },
                      customTextStyle,
                      item?.textStyle,
                    ]}
                  >
                    {item.text}
                  </Text>
                );
              }
            )}
          </View>
        ))}
      </View>
    );
  }

  return (
    <Text style={[Fonts.POPPINS_REGULAR_14, customStyle as any]}>{text}</Text>
  );
};

export default CustomTextView;
