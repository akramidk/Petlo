import { View } from "react-native";
import { Endpoints, StorageKeys } from "../../src/enums";
import {
  useAPIFetching,
  useCustomerContext,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";
import { BannersRequest, BannersResponse } from "../../src/interfaces";
import { Loading } from "../../src/components/pages";
import Scrollable from "../_Scrollable";
import Banners from "./_components/Banners";
import { Warning } from "../../src/components/molecules";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { customer, skipCustomer, setSkipCustomer } = useCustomerContext();
  const { storedLanguage, languageGender } = useInternationalizationContext();

  const [isCheckingRevalidationFinished, setIsCheckingRevalidationFinished] =
    useState(false);

  const { response: bannersResponse, mutate: mutateBanners } = useAPIFetching<
    BannersRequest,
    BannersResponse
  >({
    endpoint: Endpoints.BANNERS,
    body: {
      variant: languageGender ?? "masculine",
    },
    SWROptions: {
      revalidateIfStale: false,
    },
    options: {
      // TODO ther's a problem that the home page is rendered then
      // the user got redirct to right page by RoutesRestrictor
      // this should be fix
      wait:
        !storedLanguage ||
        (!customer && !skipCustomer) ||
        (!languageGender && storedLanguage === "ar"),
    },
  });

  useEffect(() => {
    (async () => {
      if (
        JSON.parse(
          await AsyncStorage.getItem(StorageKeys.REVALIDATE_HOME_PAGE_DATA)
        ) === true
      ) {
        mutateBanners();
        await AsyncStorage.removeItem(StorageKeys.REVALIDATE_HOME_PAGE_DATA);
      }
    })();

    setIsCheckingRevalidationFinished(true);
  }, []);

  if (
    !storedLanguage ||
    (!customer && !skipCustomer) ||
    bannersResponse === undefined ||
    bannersResponse.isFetching ||
    isCheckingRevalidationFinished === false
  ) {
    return <Loading />;
  }

  return (
    <Scrollable cn="px-[0px] space-y-[28px] bg-[#fff]">
      <View>
        {customer === null && (
          <Warning
            secondText={t("COMMON__NO_CUSTOMER_WARNING")}
            onClick={() => setSkipCustomer(false)}
            containerCN="mb-[4px] mx-[28px] justify-center"
            viewCN="items-center"
          />
        )}

        {bannersResponse.body.data.length > 0 && (
          <Banners data={bannersResponse.body.data} />
        )}
      </View>
    </Scrollable>
  );
};

export default Home;
