import { useGoLive } from "@/src/contexts/GoLiveContext";
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
  onPress?: () => void;
  isLogout?: boolean;
  hasToggle?: boolean;
}

const MenuList: React.FC = () => {
  const { Layout, Colors, Fonts, Gutters, Images } = useTheme();
  const { t } = useTranslation();
  const { isGoLive } = useGoLive();

  const menuItems: MenuItem[] = [
    {
      id: "profile",
      title: t("common:menu.profile"),
      icon: "Profile",
      onPress: () => router.push("/profile"),
    },
    {
      id: "change_password",
      title: t("common:menu.change_password"),
      icon: "Change_Password",
      onPress: () => router.push("/change-password"),
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const IconComponent =
      Images.svg[item.icon as keyof typeof Images.svg]?.default;

    const WrapperComponent = item.hasToggle ? View : TouchableOpacity;
    const wrapperProps = item.hasToggle
      ? {}
      : {
          activeOpacity: 0.8,
          onPress: item.onPress,
        };

    return (
      <WrapperComponent
        key={item.id}
        {...wrapperProps}
        style={[
          Layout.rowBetween,
          Layout.alignItemsCenter,
          Gutters.regularVPadding,
          Gutters.tinyBMargin,
          {
            backgroundColor: Colors.white,
            borderBottomWidth: 2,
            borderBottomColor: "#F0F3F4",
          },
        ]}
      >
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          {IconComponent && (
            <View style={[Gutters.smallRMargin]}>
              <IconComponent
                width={mS(24)}
                height={mS(24)}
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

        {!item.isLogout ? (
          <Images.svg.Long_Arrow_Right.default
            width={mS(20)}
            height={mS(20)}
            fill={Colors.text_91A8AD}
          />
        ) : null}
      </WrapperComponent>
    );
  };

  const renderGoLiveStatus = () => {
    const StatusDot = () => (
      <View
        style={{
          width: mS(10),
          height: mS(10),
          borderRadius: mS(5),
          backgroundColor: isGoLive
            ? Colors.status_completed
            : Colors.text_91A8AD,
          marginRight: mS(8),
        }}
      />
    );

    return (
      <View
        style={[
          Layout.rowBetween,
          Layout.alignItemsCenter,
          Gutters.regularVPadding,
          Gutters.tinyBMargin,
          {
            backgroundColor: Colors.white,
            borderBottomWidth: 2,
            borderBottomColor: "#F0F3F4",
          },
        ]}
      >
        <View>
          <Text style={[Fonts.POPPINS_MEDIUM_16, { color: Colors.text }]}>
            Go Live
          </Text>
          <Text
            style={[
              Fonts.POPPINS_REGULAR_12,
              { color: Colors.text_91A8AD, marginTop: mS(4) },
            ]}
          >
            Automatically active while the app is open
          </Text>
        </View>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <StatusDot />
          <Text
            style={[
              Fonts.POPPINS_MEDIUM_14,
              {
                color: isGoLive ? Colors.status_completed : Colors.text_91A8AD,
              },
            ]}
          >
            {isGoLive ? "Active" : "Paused"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[Gutters.smallTMargin]}>
      {renderGoLiveStatus()}
      {menuItems.map(renderMenuItem)}
    </View>
  );
};

export default MenuList;
