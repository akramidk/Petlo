import clsx from "clsx";
import { useRouter, useSearchParams } from "expo-router";
import { useMemo, useRef } from "react";
import { View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton, Text } from "../../src/components/atoms";
import { BaseButton } from "../../src/components/bases";
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
  const scrollViewRef = useRef<ScrollView>();
  const { response } = useAPIFetching<void, ItemResponse>({
    endpoint: Endpoints.ITEM,
    SWROptions: {
      revalidateIfStale: false,
    },
    slugs: {
      publicId,
    },
  });

  const { item, options, variants } = useMemo(() => {
    const item = response?.body;
    const options = response?.body?.options;
    const variants = response?.body?.variants;

    return { item, options, variants };
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
        <View className="space-y-[12px] mb-[16]">
          <View className="space-y-[6px]">
            <Text font="extraBold" cn="text-[20px] text-[#0E333C]">
              {item.name}
            </Text>

            <Text font="semiBold" cn="text-[14px] text-[#888]">
              {t("ITEM__BY")} {item.brand}
            </Text>
          </View>

          <Text font="extraBold" cn="text-[18px] text-[#0E333C]">
            20.99 USD
          </Text>
        </View>

        <View className="space-y-[12px]">
          {options.map((option, i) => {
            return (
              <View key={i}>
                <Text font="bold" cn="text-[14px] text-[#0E333C] mb-[4px]">
                  {option.name}
                </Text>

                <ScrollView
                  className={direction === "ltr" ? "self-start" : "self-end"}
                  ref={scrollViewRef}
                  contentContainerStyle={{
                    flexDirection: direction === "ltr" ? "row" : "row-reverse",
                  }}
                  onContentSizeChange={
                    direction === "rtl"
                      ? () =>
                          scrollViewRef.current?.scrollToEnd({
                            animated: false,
                          })
                      : undefined
                  }
                  horizontal
                >
                  {option.values.map((value, i) => {
                    return (
                      <View key={i}>
                        <BaseButton
                          onClick={() => {}}
                          cn={clsx(
                            "px-[28px] py-[8px] border-[1.4px] border-[#0E333C] rounded-[4px]",
                            direction === "ltr" ? "mr-[4px]" : "ml-[4px]"
                          )}
                        >
                          <Text font="semiBold" cn="text-[#0E333C] text-[13px]">
                            {value}
                          </Text>
                        </BaseButton>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Item;
