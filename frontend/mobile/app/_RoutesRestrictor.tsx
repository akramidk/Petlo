import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useSettingsContext } from "../src/hooks";

interface RoutesRestrictorProps {
  children: React.ReactNode;
  customer: undefined | null | unknown;
}

const RoutesRestrictor = ({ children, customer }: RoutesRestrictorProps) => {
  const router = useRouter();
  const { storedLanguage } = useSettingsContext();

  useEffect(() => {
    if (storedLanguage === null) {
      router.replace("/select-language");
    } else {
      if (customer === null) {
        router.replace("/welcome");
      } else {
        router.replace("/");
      }
    }
  }, [storedLanguage, customer]);

  return <>{children}</>;
};

export default RoutesRestrictor;
