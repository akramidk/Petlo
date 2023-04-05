import clsx from "clsx";
import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const { response } = useAPIFetching<void, ItemResponse>({
    endpoint: Endpoints.ITEM,
    SWROptions: {
      revalidateIfStale: false,
    },
    slugs: {
      publicId,
    },
  });

  const scrollViewRef = useRef<ScrollView>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const { item, options, variants } = useMemo(() => {
    const item = response?.body;
    const options = response?.body?.options;
    const variants = response?.body?.variants;

    return { item, options, variants };
  }, [response]);

  useEffect(() => {
    if (options === undefined || selectedOptions.length > 0) return;

    const array = selectedOptions.flat();
    options.forEach((option, i) => {
      array[i] = option.values[0];
    });

    setSelectedOptions(array);
  }, [options]);

  const variant = useMemo(() => {
    if (variants === undefined || selectedOptions.length === 0) return;
    let value;

    variants.every((variant) => {
      value = variant;
      const variantOption = variant.options.map((option) => option.value);
      const isEqual = variantOption.every((variantOptionValue) =>
        selectedOptions.find(
          (selectedOptionValue) => variantOptionValue === selectedOptionValue
        )
      );

      console.log("isEqual", isEqual);

      return !isEqual;
    });

    return value;
  }, [selectedOptions]);

  console.log("variant", variant);

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
            {variant.price} {item.currency}
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
                  {option.values.map((value, y) => {
                    return (
                      <View key={y}>
                        <BaseButton
                          onClick={() => {
                            const array = selectedOptions.flat();
                            array[i] = value;

                            console.log("array", array);

                            setSelectedOptions(array);
                          }}
                          cn={clsx(
                            "px-[28px] py-[8px] border-[1.4px] rounded-[4px]",
                            direction === "ltr" ? "mr-[4px]" : "ml-[4px]",
                            value === selectedOptions[i]
                              ? "border-[#0E333C]"
                              : "border-[#f6f6f6]"
                          )}
                        >
                          <Text font="semiBold" cn="text-[#0E333C] text-[13px]">
                            {value} {option.unit}
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
