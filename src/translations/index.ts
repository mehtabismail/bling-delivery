import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import * as resources from "./resources";

const ns = Object.keys(Object.values(resources)[0]);
export const defaultNS = ns[0];

// Load the saved language from AsyncStorage BEFORE init
async function getSavedLanguage() {
  try {
    const lang = await AsyncStorage.getItem("appLanguage");
    return lang || "en"; // default to English if nothing saved
  } catch {
    return "en";
  }
}

// initialize i18n dynamically
(async () => {
  const savedLang = await getSavedLanguage();

  i18n.use(initReactI18next).init({
    ns,
    defaultNS,
    resources: {
      ...Object.entries(resources).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {}
      ),
    },
    lng: savedLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: "v3",
  });

  // set RTL/LTR state at startup
  const willBeRTL = savedLang === "ar";
  if (I18nManager.isRTL !== willBeRTL) {
    I18nManager.forceRTL(willBeRTL);
    try {
      await Updates.reloadAsync();
    } catch (e) {
      console.warn("Could not reload app after RTL change", e);
    }
  }
})();

export const changeAppLanguage = async (langCode: string) => {
  // Save new language in AsyncStorage
  try {
    await AsyncStorage.setItem("appLanguage", langCode);
  } catch (e) {
    console.warn("Could not save language", e);
  }

  // determine if RTL is needed
  const willBeRTL = langCode === "ar";

  // update i18n first
  await i18n.changeLanguage(langCode);

  // check current RTL state
  if (I18nManager.isRTL !== willBeRTL) {
    // flip RTL/LTR
    I18nManager.forceRTL(willBeRTL);

    // reload app to apply direction changes
    try {
      await Updates.reloadAsync();
    } catch (e) {
      console.warn("Could not reload app after RTL change", e);
    }
  }
};

export default i18n;
