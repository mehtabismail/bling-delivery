import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ title: "Signin" }} />
    </Stack>
  );
};

export default AuthLayout;
