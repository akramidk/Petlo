import { useEffect, useState } from "react";
import { languages } from "../types";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type direction = "ltr" | "rtl";
enum languagesDirection {
  "en" = "ltr",
  "arMasculine" = "rtl",
  "arFeminine" = "rtl",
}

const useSettings = () => {
  //we are handling ltr and rtl on our own
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);

  const [storedLanguage, setStoredLanguage] = useState<
    undefined | null | languages
  >();
  const setStoredLanguageFromAsyncStorage = async () => {
    // await AsyncStorage.removeItem("PETLO_APP_LANGUAGE");

    const value = (await AsyncStorage.getItem(
      "PETLO_APP_LANGUAGE"
    )) as languages;

    setStoredLanguage(value);
  };

  useEffect(() => {
    setStoredLanguageFromAsyncStorage();
  }, []);

  const [language, setLanguage] = useState<languages>(storedLanguage ?? "en");
  const [direction, setDirection] = useState<direction>(
    languagesDirection[storedLanguage ?? "en"]
  );

  const changeLanguage = async (language: languages) => {
    const direction = languagesDirection[language];

    await AsyncStorage.setItem("PETLO_APP_LANGUAGE", language);
    setStoredLanguage(language);
    setLanguage(language);
    setDirection(direction);
  };

  return { language, changeLanguage, storedLanguage, direction };
};

export default useSettings;
