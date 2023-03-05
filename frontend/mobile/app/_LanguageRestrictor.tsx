import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useSettingsContext } from "../src/hooks";

interface LanguageRestrictorProps {
  children: React.ReactNode;
}

const LanguageRestrictor = ({ children }: LanguageRestrictorProps) => {
  const router = useRouter();
  const { storedLanguage } = useSettingsContext();

  useEffect(() => {
    if (storedLanguage === null) {
      router.replace("/select-language");
    } else {
      router.replace("/");
    }
  }, [storedLanguage]);

  return <>{children}</>;
};

export default LanguageRestrictor;
