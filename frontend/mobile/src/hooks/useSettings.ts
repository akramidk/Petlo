import { useMemo, useState } from "react";
import { languages } from "../types";
import { I18nManager } from "react-native";

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

  useMemo(() => {
    const direction = languagesDirection[language];
    setDirection(direction);
  }, [language]);

  return { language, setLanguage, direction };
};

export default useSettings;
