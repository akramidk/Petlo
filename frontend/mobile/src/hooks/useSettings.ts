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

const DEFAULT_APP_LANGUAGE = "ar_masculine";

const useSettings = () => {
  //we are handling ltr and rtl on our own
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);

  const [storedLanguage, setStoredLanguage] = useState<
    undefined | null | language
  >();

  //removeGender from gendered languages
  const removeGender = (language: language) => {
    return language.split("_")[0] as "ar" | "en";
  };

  //set thing temporarily
  const [language, setLanguage] = useState<language>(DEFAULT_APP_LANGUAGE);
  const [languageWithoutGender, setLanguageWithoutGender] = useState<
    "en" | "ar"
  >(removeGender(DEFAULT_APP_LANGUAGE));
  const [direction, setDirection] = useState<direction>(
    languagesDirection[DEFAULT_APP_LANGUAGE]
  );

  //changeLanguage temporarily(force = false) or permanently(force = true, this's change the storedLanguage)
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

  useEffect(() => {
    //if there's a storedLanguage use it permanently
    (async () => {
      await AsyncStorage.removeItem(StorageKeys.LANGUAGE);

      const value = (await AsyncStorage.getItem(
        StorageKeys.LANGUAGE
      )) as language;

      setStoredLanguage(value);
    })();

    if (storedLanguage && storedLanguage !== language) {
      changeLanguage(storedLanguage, false);
      return;
    }

    //if no storedLanguage & the deviceLanguage is one of our languages
    //use it temporarily until the customer select a language as permanently
    const deviceLanguage = getLocales()[0].languageCode;
    const deviceGenderedLanguage = defaultGenderedLanguage[deviceLanguage];

    if (deviceGenderedLanguage && deviceGenderedLanguage !== language) {
      changeLanguage(deviceGenderedLanguage, false);
      return;
    }
  }, []);

  return {
    language,
    changeLanguage,
    storedLanguage,
    direction,
    languageWithoutGender,
  };
};

export default useSettings;
