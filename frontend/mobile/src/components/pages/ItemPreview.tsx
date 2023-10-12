import clsx from "clsx";
import { View } from "react-native";
import {
  useAPIFetching,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../hooks";
import { Item, ItemResponse } from "../../interfaces";
import { BackButton, Text, BottomContainer, Button } from "../atoms";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useMemo, useRef, useState } from "react";
import { BaseButton } from "../bases";
import { buttonStatus } from "../../types";
import { Endpoints } from "../../enums";
import Loading from "./Loading";
import { Image } from "expo-image";

interface ItemPreviewProps {
  publicId: string;
  onBack: () => void;
  onAdd: (itemId: string, variantId: string) => void;
  addStatus?: buttonStatus;
  addTranslationValue: string;
  bottomContainerCN?: string;
  addButtonDisabled?: boolean;
  bottomContainerElement?: React.ReactNode;
}

const ItemPreview = ({
  publicId,
  onBack,
  onAdd,
  addStatus,
  addTranslationValue,
  bottomContainerCN,
  addButtonDisabled,
  bottomContainerElement,
}: ItemPreviewProps) => {
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
    options: {
      wait: publicId === undefined,
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

      return !isEqual;
    });

    return value;
  }, [selectedOptions]);

  useEffect(() => {
    if (options === undefined || selectedOptions.length > 0) return;

    const array = selectedOptions.flat();
    options.forEach((option, i) => {
      array[i] = option.values[0].value;
    });

    setSelectedOptions(array);
  }, [options]);

  if (
    response === undefined ||
    response.isFetching ||
    !variant ||
    !item ||
    !options
  ) {
    return <Loading />;
  }

  return (
    <>
      <View className="h-[306px] bg-[#f6f6f6]">
        <BackButton
          onClick={onBack}
          cn={clsx(
            "absolute bg-[#eee] mt-[12px] z-10",
            direction === "ltr" ? "ml-[12px] left-0" : "mr-[12px] right-0"
          )}
        />

        <Image
          style={{
            flex: 1,
          }}
          source={{
            uri: item.image,
          }}
          contentFit="cover"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-[28px]">
          <View className="space-y-[12px] mb-[16]">
            <View className="space-y-[6px]">
              <Text font="extraBold" cn="text-[20px] text-[#0E333C]">
                {item.name}
              </Text>

              <Text font="semiBold" cn="text-[14px] text-[#888]">
                {t("ITEM_PREVIEW__BY")} {item.brand}
              </Text>
            </View>

            <Text font="extraBold" cn="text-[18px] text-[#0E333C]">
              {variant?.price} {item.currency}
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
                      flexDirection:
                        direction === "ltr" ? "row" : "row-reverse",
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
                    showsHorizontalScrollIndicator={false}
                  >
                    {option.values.map((value, y) => {
                      return (
                        <View key={y}>
                          <BaseButton
                            onClick={() => {
                              const array = selectedOptions.flat();
                              array[i] = value.value;

                              setSelectedOptions(array);
                            }}
                            cn={clsx(
                              "px-[28px] py-[8px] border-[1.4px] rounded-[4px]",
                              direction === "ltr" ? "mr-[4px]" : "ml-[4px]",
                              value.value === selectedOptions[i]
                                ? "border-[#0E333C]"
                                : "border-[#f6f6f6]"
                            )}
                          >
                            <Text
                              font="semiBold"
                              cn="text-[#0E333C] text-[13px]"
                            >
                              {value.value} {value.unit}
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
        </View>
      </ScrollView>

      <BottomContainer cn={clsx("pb-[8px]", bottomContainerCN)}>
        {bottomContainerElement}

        <Button
          value={
            variant.available
              ? addTranslationValue
              : t("ITEM_PREVIEW__ADD_TO_CART_VARIANT_NOT_AVAILABLE_BUTTON")
          }
          onClick={() => onAdd(item.public_id, variant.public_id)}
          status={
            addButtonDisabled
              ? "inactive"
              : addStatus ?? (variant.available ? "active" : "inactive")
          }
        />
      </BottomContainer>
    </>
  );
};

export default ItemPreview;
