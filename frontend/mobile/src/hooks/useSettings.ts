import { useMemo, useState } from "react";
import { languages } from "../types";

const useSettings = () => {
  const [language, setLanguage] = useState<languages>("en");
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  useMemo(() => {
    if (language === "en") {
      setDirection("ltr");
    } else {
      setDirection("rtl");
    }
  }, [language]);

  return { language, setLanguage, direction };
};

export default useSettings;
