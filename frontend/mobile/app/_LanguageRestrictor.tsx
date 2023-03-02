import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LanguageRestrictorProps {
  children: React.ReactNode;
}

const LanguageRestrictor = ({ children }: LanguageRestrictorProps) => {
  const router = useRouter();

  const redirectIfNoLanguage = async () => {
    const value = await AsyncStorage.getItem("PETLO_APP_LANGUAGE");

    if (value === null) {
      router.replace("/select-language");
    }
  };

  useEffect(() => {
    redirectIfNoLanguage();
  }, []);

  return <>{children}</>;
};

export default LanguageRestrictor;
