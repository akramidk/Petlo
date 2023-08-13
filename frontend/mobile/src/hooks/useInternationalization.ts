import { useEffect, useState } from "react";
import { language } from "../types";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { StorageKeys } from "../enums";
import { DEFAULT_APP_LANGUAGE } from "../constants";

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

const useInternationalization = () => {
  //we are handling ltr and rtl on our own
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);

  const [storedLanguage, setStoredLanguage] = useState<
    undefined | null | language
  >();

  //remove gender from gendered languages
  const removeGender = (language: language) => {
    return language.split("_")[0] as "ar" | "en";
  };

  //remove language from gendered languages
  const removeLanguage = (language: language) => {
    return language.split("_")[1] as "masculine" | "feminine" | null;
  };

  //set thing temporarily
  const appLanguage = DEFAULT_APP_LANGUAGE.withGender as language;
  const [language, setLanguage] = useState<language>(appLanguage);
  const [languageWithoutGender, setLanguageWithoutGender] = useState<
    "en" | "ar"
  >(removeGender(appLanguage));
  const [languageGender, setLanguageGender] = useState<
    "masculine" | "feminine" | null
  >(removeLanguage(appLanguage));
  const [direction, setDirection] = useState<direction>(
    languagesDirection[appLanguage]
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
    setLanguageGender(removeLanguage(language));
    setDirection(direction);
  };

  useEffect(() => {
    //if there's a storedLanguage use it permanently
    (async () => {
      const value = (await AsyncStorage.getItem(
        StorageKeys.LANGUAGE
      )) as language;

      if (
        value === "en" ||
        value === "ar_masculine" ||
        value === "ar_feminine"
      ) {
        changeLanguage(value, true);
      } else {
        /**
         * if no storedLanguage setStoredLanguage to null to hide the loading seccren
         * and set the app language to the device language if it's one of the app languages
         */
        setStoredLanguage(null);

        const deviceLanguage = getLocales()[0].languageCode;
        const deviceGenderedLanguage = defaultGenderedLanguage[deviceLanguage];

        if (deviceGenderedLanguage && deviceGenderedLanguage !== language) {
          changeLanguage(deviceGenderedLanguage, false);
          return;
        }
      }
    })();
  }, []);

  return {
    language,
    changeLanguage,
    storedLanguage,
    direction,
    languageWithoutGender,
    languageGender,
  };
};

export default useInternationalization;
