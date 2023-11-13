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
import { Icon, Text } from "../../src/components/atoms";
import { BaseButton } from "../../src/components/bases";
import clsx from "clsx";

const Home = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { customer, skipCustomer, setSkipCustomer } = useCustomerContext();
  const { storedLanguage, languageGender, direction } =
    useInternationalizationContext();

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

      <View className="px-[28px]">
        <Text font="extraBold" cn="text-[#333] text-[16px]">
          {t("HOME__WHAT_DO_YOU_WANT_TODAY")}
        </Text>

        <View className="mt-[12px] space-y-[8px]">
          {DATA.map((item, index) => {
            return (
              <BaseButton
                key={index}
                onClick={() => {
                  router.push(item.path);
                }}
                cn="rounded-[4px] p-[24px] border-[#f6f6f6] border-[1px]"
              >
                <View>
                  <View
                    className={clsx(
                      "mb-[16px]",
                      direction === "rtl" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <Icon
                      name={item.icon}
                      size={24}
                      color="#0E333C"
                      solid={false}
                      strokeWidth={2}
                    />
                  </View>

                  <Text font="bold" cn="text-[16px] mb-[8px] text-[#0E333C]">
                    {t(item.title)}
                  </Text>

                  <Text font="medium" cn="text-[15px] text-[#666]">
                    {t(item.description)}
                  </Text>
                </View>
              </BaseButton>
            );
          })}
        </View>
      </View>
    </Scrollable>
  );
};

const DATA = [
  {
    title: "HOME__PETLO_AUTOSHIP",
    description: "HOME__PETLO_AUTOSHIP_DESCRIPTION",
    icon: "clock",
    path: "/autoships",
  },
  {
    title: "HOME__PETLO_SHOP",
    description: "HOME__PETLO_SHOP_DESCRIPTION",
    icon: "shoppingBag",
    path: "/shop",
  },
];

export default Home;
