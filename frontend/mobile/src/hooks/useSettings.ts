import { useEffect, useState } from "react";
import { language } from "../types";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { StorageKeys } from "../enums";

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
    await AsyncStorage.removeItem(StorageKeys.LANGUAGE);

    const value = (await AsyncStorage.getItem(
      StorageKeys.LANGUAGE
    )) as language;

    setStoredLanguage(value);
  };

  useEffect(() => {
    setStoredLanguageFromAsyncStorage();
  }, []);

  const removeGender = (language: language) => {
    return language.split("_")[0] as "ar" | "en";
  };

  const deviceLanguage = defaultGenderedLanguage[getLocales()[0].languageCode]; // TODO check if en or ar first
  const finalLanguage = storedLanguage ?? "en";
  const [language, setLanguage] = useState<language>(finalLanguage);
  const [languageWithoutGender, setLanguageWithoutGender] = useState<
    "en" | "ar"
  >(removeGender(finalLanguage));
  const [direction, setDirection] = useState<direction>(
    languagesDirection[finalLanguage]
  );

  const changeLanguage = async (language: language, force: boolean) => {
    const direction = languagesDirection[language];

    if (force) {
      await AsyncStorage.setItem(StorageKeys.LANGUAGE, language);
      setStoredLanguage(language);
    }

    setLanguage(language);
    setLanguageWithoutGender(removeGender(language));
    setDirection(direction);
  };

  return {
    language,
    changeLanguage,
    storedLanguage,
    direction,
    languageWithoutGender,
  };
};

export default useSettings;
