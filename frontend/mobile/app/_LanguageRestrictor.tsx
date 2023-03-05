import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { language } from "../src/types";

interface LanguageRestrictorProps {
  children: React.ReactNode;
  storedLanguage: language | null;
}

const LanguageRestrictor = ({
  children,
  storedLanguage,
}: LanguageRestrictorProps) => {
  const router = useRouter();

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
