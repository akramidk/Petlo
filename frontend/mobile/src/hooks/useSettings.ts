import { useState } from "react";
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

  const [language, setLanguage] = useState<languages>("en");
  const [direction, setDirection] = useState<direction>("ltr");

  const changeLanguage = async (language: languages) => {
    const direction = languagesDirection[language];

    await AsyncStorage.setItem("PETLO_APP_LANGUAGE", language);
    setLanguage(language);
    setDirection(direction);
  };

  return { language, changeLanguage, direction };
};

export default useSettings;
