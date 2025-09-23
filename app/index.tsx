import { RootState } from "@/src/store/store";
import { Redirect } from "expo-router";
import React from "react";
import { useSelector } from "react-redux";

const Index = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return !token ? (
    <Redirect href={"/(auth)"} />
  ) : (
    <Redirect href={"/(app)/(tabs)"} />
  );
};

export default Index;
