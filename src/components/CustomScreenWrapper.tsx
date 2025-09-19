import React from "react";
import { Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "../hooks";
import { mS } from "../utils/helper";

const CustomScreenWrapper = ({ children, customStyle }: any) => {
  const { Layout, Colors } = useTheme();

  return (
    <KeyboardAwareScrollView
      style={[Layout.fill]}
      contentContainerStyle={[
        {
          flexGrow: 1,
          paddingHorizontal: mS(15),
          backgroundColor: Colors.background,
          ...customStyle,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children ? children : <Text>Page Content not Exist</Text>}
    </KeyboardAwareScrollView>
  );
};

export default CustomScreenWrapper;
