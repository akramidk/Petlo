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

      <View className="px-[28px]">
        <Text font="extraBold" cn="text-[#333] text-[16px]">
          What do you want today?
        </Text>

        <View className="mt-[12px] space-y-[8px]">
          {DATA.map((item, index) => {
            return (
              <BaseButton
                key={index}
                style={{ backgroundColor: item.bgColor }}
                onClick={() => {
                  router.push(item.path);
                }}
                cn="rounded-[4px]"
              >
                <View className="flex flex-row">
                  <View className="w-[75%] p-[24px]">
                    <View className="mb-[8px]">
                      <Icon
                        name={item.icon}
                        size={24}
                        color={item.iconColor}
                        solid={false}
                        strokeWidth={2}
                      />
                    </View>

                    <Text
                      font="bold"
                      cn="text-[16px] mb-[6px]"
                      style={{ color: item.titleColor }}
                    >
                      {item.title}
                    </Text>

                    <Text
                      font="medium"
                      cn="text-[15px]"
                      style={{ color: item.descriptionColor }}
                    >
                      {item.description}
                    </Text>
                  </View>

                  <View className="flex items-center justify-center w-[25%] p-[24px]">
                    <Icon
                      name="arrowSmallRight"
                      color={item.arrowColor}
                      size={24}
                      solid={false}
                      strokeWidth={2}
                    />
                  </View>
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
    title: "Petlo Autoship",
    description:
      "Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla",
    titleColor: "#ffffff",
    descriptionColor: "#cccccc",
    bgColor: "#164863",
    arrowColor: "#ffffff",
    icon: "clock",
    iconColor: "#ffffff",
    path: "/autoships",
  },
  {
    title: "Petlo Shop",
    description:
      "Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla",
    titleColor: "#0E333C",
    descriptionColor: "#555555",
    bgColor: "#F2E4E4",
    arrowColor: "#0E333C",
    icon: "shoppingBag",
    iconColor: "#0E333C",
    path: "/shop",
  },
];

export default Home;
