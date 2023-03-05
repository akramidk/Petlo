import { useEffect, useState } from "react";
import { language } from "../types";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";

type direction = "ltr" | "rtl";
enum languagesDirection {
  "en" = "ltr",
  "ar_masculine" = "rtl",
  "ar_feminine" = "rtl",
}

enum defaultGenderedLanguage {
  "en" = "en",
  "ar" = "ar_masculine",
}

const useSettings = () => {
  //we are handling ltr and rtl on our own
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);

  const [storedLanguage, setStoredLanguage] = useState<
    undefined | null | language
  >();
  const setStoredLanguageFromAsyncStorage = async () => {
    await AsyncStorage.removeItem("PETLO_APP_LANGUAGE");

    const value = (await AsyncStorage.getItem(
      "PETLO_APP_LANGUAGE"
    )) as language;

    setStoredLanguage(value);
  };

  useEffect(() => {
    setStoredLanguageFromAsyncStorage();
  }, []);

  const deviceLanguage = defaultGenderedLanguage[getLocales()[0].languageCode];
  const finalLanguage = storedLanguage ?? "en";
  const [language, setLanguage] = useState<language>(finalLanguage);
  const [direction, setDirection] = useState<direction>(
    languagesDirection[finalLanguage]
  );

  const changeLanguage = async (language: language, force: boolean) => {
    const direction = languagesDirection[language];

    if (force) {
      await AsyncStorage.setItem("PETLO_APP_LANGUAGE", language);
      setStoredLanguage(language);
    }

    setLanguage(language);
    setDirection(direction);
  };

  return { language, changeLanguage, storedLanguage, direction };
};

export default useSettings;
