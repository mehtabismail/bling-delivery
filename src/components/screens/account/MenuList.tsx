import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
  isLogout?: boolean;
}

const MenuList: React.FC = () => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      id: "profile",
      title: t("common:menu.profile"),
      icon: "Profile",
      onPress: () => router.push("/(app)/profile"),
    },
    {
      id: "change_password",
      title: t("common:menu.change_password"),
      icon: "Change_Password",
      onPress: () => router.push("/(app)/change-password"),
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const IconComponent =
      Images.svg[item.icon as keyof typeof Images.svg]?.default;

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.8}
        onPress={item.onPress}
        style={[
          Layout.rowBetween,
          Layout.alignItemsCenter,
          Gutters.smallHPadding,
          Gutters.xTinyGapVPadding,
          Gutters.nanoBMargin,
          {
            backgroundColor: Colors.white,
          },
        ]}
      >
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          {IconComponent && (
            <View style={[Gutters.xTinyGapRMargin]}>
              <IconComponent
                width={mS(20)}
                height={mS(20)}
                fill={item.isLogout ? Colors.error : Colors.text}
              />
            </View>
          )}
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_16,
              {
                color: item.isLogout ? Colors.error : Colors.text,
              },
            ]}
          >
            {item.title}
          </Text>
        </View>

        {!item.isLogout && (
          <Images.svg.Long_Arrow_Right.default
            width={mS(16)}
            height={mS(16)}
            fill={Colors.text_91A8AD}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[Gutters.smallTMargin]}>{menuItems.map(renderMenuItem)}</View>
  );
};

export default MenuList;
