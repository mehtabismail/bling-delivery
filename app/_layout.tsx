import { GoLiveProvider } from "@/src/contexts/GoLiveContext";
import SocketLocationService from "@/src/services/SocketLocationService";
import { toastConfig } from "@/src/utils/toast";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Platform,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import "../src/translations";

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.container,
        paddingTop: safeAreaInsets.top,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
      {/* Socket Location Service - runs globally across all screens */}
      <SocketLocationService />
    </View>
  );
}

export default function RootLayout() {
  const isDarkMode = useColorScheme() === "dark";
  const { t } = useTranslation();
  global.t = t;

  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <GoLiveProvider>
            <StatusBar barStyle={"default"} />
            <AppContent />
          </GoLiveProvider>
        </Provider>
      </SafeAreaProvider>
      <Toast
        config={toastConfig}
        topOffset={Platform.OS === "ios" ? 60 : 40}
        visibilityTime={4000}
        autoHide={true}
        position="top"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
