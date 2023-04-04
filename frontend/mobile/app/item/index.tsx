import clsx from "clsx";
import { useRouter, useSearchParams } from "expo-router";
import { useMemo } from "react";
import { View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton, Text } from "../../src/components/atoms";
import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";
import { ItemResponse } from "../../src/interfaces";
import Loading from "../_Loading";

const Item = () => {
  const router = useRouter();
  const { publicId } = useSearchParams();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();
  const { response } = useAPIFetching<void, ItemResponse>({
    endpoint: Endpoints.ITEM,
    SWROptions: {
      revalidateIfStale: false,
    },
    slugs: {
      publicId,
    },
  });

  const item = useMemo(() => {
    if (response.isFetching) return;

    return response.body;
  }, [response]);

  if (response.isFetching) {
    return <Loading />;
  }

  return (
    <View className="grow">
      <View className="h-[306px] p-[56px] bg-[#f6f6f6]">
        <BackButton
          onClick={router.back}
          cn={clsx(
            "absolute bg-[#eee] mt-[12px]",
            direction === "ltr" ? "ml-[12px] left-0" : "mr-[12px] right-0"
          )}
        />

        <Image
          style={{
            flex: 1,
            resizeMode: "contain",
          }}
          source={{
            uri: item.image,
          }}
        />
      </View>

      <ScrollView className="p-[28px]">
        <View className="space-y-[16px]">
          <View className="space-y-[4px]">
            <Text font="extraBold" cn="text-[20px] text-[#0E333C]">
              {item.name}
            </Text>

            <Text font="semiBold" cn="text-[14px] text-[#444]">
              {t("ITEM__BY")} {item.brand}
            </Text>
          </View>

          <Text font="extraBold" cn="text-[18px] text-[#0E333C]">
            20.99 USD
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Item;
