import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useSettingsContext, useCustomerContext } from "../src/hooks";

interface RoutesRestrictorProps {
  children: React.ReactNode;
}

const RoutesRestrictor = ({ children }: RoutesRestrictorProps) => {
  const router = useRouter();
  const { customer } = useCustomerContext();
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
