import { useTheme } from "@/src/hooks";
import { mS } from "@/src/utils/helper";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  const { Images, Layout, Colors, Gutters } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: Colors.text,
        tabBarInactiveTintColor: Colors.secondary,
        tabBarStyle: {
          height: mS(80),
          backgroundColor: Colors.background,
          borderTopWidth: 0.5,
          borderTopColor: Colors.border_primary,
          justifyContent: "center",
        },
        tabBarIconStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarItemStyle: {
          ...Layout.center,
          ...Gutters.gapTPadding,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ focused }) => <Images.svg.Home_Tab_Filled.default />,
        }}
      />
      <Tabs.Screen
        name='packages'
        options={{
          tabBarIcon: ({ focused }) => <Images.svg.Packages.default />,
        }}
      />

      <Tabs.Screen
        name='account'
        options={{
          tabBarIcon: ({ focused }) => <Images.svg.Account_Tab.default />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
