import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  useInternationalizationContext,
  useCustomerContext,
} from "../src/hooks";
import { Loading } from "../src/components/pages";

interface RoutesRestrictorProps {
  children: React.ReactNode;
}

const RoutesRestrictor = ({ children }: RoutesRestrictorProps) => {
  const router = useRouter();
  const { customer, skipCustomer } = useCustomerContext();
  const { storedLanguage } = useInternationalizationContext();

  useEffect(() => {
    if (storedLanguage === null) {
      router.replace("/select-language");
    } else {
      if (customer === null && !skipCustomer) {
        router.replace("/welcome");
      } else {
        router.replace("/");
      }
    }
  }, [storedLanguage, customer, skipCustomer]);

  return <>{children}</>;
};

export default RoutesRestrictor;
