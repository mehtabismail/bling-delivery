import { CustomHeader, CustomTextInput } from "@/src/components";
import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Home = () => {
  const { Layout, Colors } = useTheme();

  const [search, setSearch] = useState("");

  const handleChangeInput = (value: string, fieldname: any) => {
    setSearch((prev: any) => ({ ...prev, [fieldname]: value }));
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <CustomHeader
        centerIcon='Bling'
        rightIcon='Notification'
        onPressRight={() => router.push("/(app)/notification")}
        customStyles={[Layout.screenWithoutFill]}
      />
      <KeyboardAwareScrollView
        style={[Layout.fill]}
        contentContainerStyle={[
          {
            flexGrow: 1,
            backgroundColor: Colors.background,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[Layout.screenWithoutFill]}>
          <CustomTextInput
            placeholder={t("common:home.text_input_placeholder")}
            value={search}
            fieldName='search'
            handleChangeInput={handleChangeInput}
            keyboardType='web-search'
            type='text'
            leftIcon={"Search"}
            customContainerStyle={{
              backgroundColor: Colors.textinput_background,
              height: mS(48),
              borderWidth: 0,
              borderRadius: mS(18),
            }}
            numberOfLines={1}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Home;
