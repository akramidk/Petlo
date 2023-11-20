import clsx from "clsx";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { Text } from "../atoms";
import { BaseButton } from "../bases";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../hooks";
import { BriefItem } from "../../interfaces";
import reactStringReplace from "react-string-replace";
import { Image } from "expo-image";
import { Skeleton } from "moti/skeleton";

interface ItemProps {
  variant: "small" | "large";
  data: BriefItem;
  onClick: () => void;
}

const Item = ({ variant, data, onClick }: ItemProps) => {
  const { t } = useTranslationsContext();
  const { languageWithoutGender, direction } = useInternationalizationContext();

  const price = useMemo(() => {
    const min = data.variants.prices.min;
    const max = data.variants.prices.max;
    if (min === max) return `${min}`;

    return `${min} - ${max}`;
  }, [data.variants.prices]);

  const numberOfOptionsInside = useMemo(() => {
    const number = data.variants.number;

    if (languageWithoutGender === "en")
      return `${number} ${t("HOME__OPTIONS_INSIDE")}`;

    if (number === 2) return t("HOME__OPTIONS_INSIDE_2");
    if (number <= 10)
      return `${number} ${t("HOME__OPTIONS_INSIDE_3_AND_ABOVE")}`;
    if (number > 10)
      return `${number} ${t("HOME__OPTIONS_INSIDE_11_AND_ABOVE")}`;
  }, [data.variants.number]);

  const variantsStyles: {
    measurements: string;
    imageMeasurements: string;
    titleText: string;
    priceText: string;
  } = useMemo(() => {
    const variants = {
      small: {
        measurements: "w-[200px] h-[312]",
        imageMeasurements: "h-[172px]",
        titleText: "text-[14px] leading-[22px]",
        priceText: "text-[16px]",
      },
      large: {
        measurements: "w-[100%]",
        imageMeasurements: "h-[216px]",
        titleText: "text-[16px] leading-[26px]",
        priceText: "text-[16px]",
      },
    };

    return variants[variant];
  }, [variant]);

  const itemName = useMemo(() => {
    return (
      <Text
        font="semiBold"
        cn={clsx("text-[#0E333C]", variantsStyles.titleText)}
        numberOfLines={3}
      >
        {reactStringReplace(data.name, data.brand, (match, i) => (
          <Text key={i} font="extraBold">
            {match}
          </Text>
        ))}
      </Text>
    );
  }, [data.name, data.brand]);

  const [loadingImage, setLoadingImage] = useState(true);

  return (
    <BaseButton
      className={clsx(
        "rounded-[4px] border-[1px] border-[#f6f6f6]",
        variantsStyles.measurements
      )}
      onClick={onClick}
    >
      <View className={clsx("bg-[#f9f9f9]", variantsStyles.imageMeasurements)}>
        <Skeleton
          show={loadingImage}
          height={216}
          width="100%"
          colorMode="light"
          radius={4}
          transition={{
            type: "timing",
            duration: 3000,
          }}
          backgroundColor="#f9f9f9"
        >
          <Image
            style={{
              flex: 1,
            }}
            source={{
              uri: data.image,
            }}
            contentFit="contain"
            onLoad={() => setLoadingImage(false)}
          />
        </Skeleton>
        {data.variants.number > 1 && (
          <View
            className={clsx(
              "bg-[#0E333C] absolute mt-[12px] py-[6px] px-[10px] rounded-[4px] opacity-90",
              direction === "ltr" ? "left-0 ml-[12px]" : "right-0 mr-[12px]"
            )}
          >
            <Text font="medium" cn="text-[#fff] text-[13px]">
              {numberOfOptionsInside}
            </Text>
          </View>
        )}
      </View>

      <View className="p-[16px] flex-1 justify-between space-y-[20px]">
        {itemName}

        <Text
          font="extraBold"
          cn={clsx("text-[#0E333C]", variantsStyles.priceText)}
        >
          {`${price} ${data.variants.prices.currency}`}
        </Text>
      </View>
    </BaseButton>
  );
};

export default Item;
