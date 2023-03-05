import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useSettingsContext } from "../src/hooks";

interface RoutesRestrictorProps {
  children: React.ReactNode;
  user: undefined | null;
}

const RoutesRestrictor = ({ children, user }: RoutesRestrictorProps) => {
  const router = useRouter();
  const { storedLanguage } = useSettingsContext();

  useEffect(() => {
    if (storedLanguage === null) {
      router.replace("/select-language");
    } else {
      if (user === null) {
        router.replace("/welcome");
      } else {
        router.replace("/");
      }
    }
  }, [storedLanguage, user]);

  return <>{children}</>;
};

export default RoutesRestrictor;
