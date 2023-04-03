import clsx from "clsx";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, View } from "react-native";
import { Text } from "../../../src/components/atoms";
import { BaseButton } from "../../../src/components/bases";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import { BriefItem } from "../../../src/interfaces";

interface ItemProps {
  variant: "small" | "large";
  data: BriefItem;
}

const Item = ({ variant, data }: ItemProps) => {
  const router = useRouter();
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
        measurements: "w-[200px] h-[325]",
        imageMeasurements: "h-[172px]",
        titleText: "text-[14px]",
        priceText: "text-[16px]",
      },
      large: {
        measurements: "w-[100%] h-[332]",
        imageMeasurements: "h-[196px]",
        titleText: "text-[16px]",
        priceText: "text-[16px]",
      },
    };

    return variants[variant];
  }, [variant]);

  return (
    <BaseButton
      className={clsx(
        "rounded-[4px] border-[1px] border-[#f6f6f6]",
        variantsStyles.measurements
      )}
      onClick={() => router.push(`/item?publicId=${data.public_id}`)}
    >
      <View
        className={clsx(
          "p-[28px] bg-[#F9F9F9]",
          variantsStyles.imageMeasurements
        )}
      >
        <Image
          style={{
            flex: 1,
            resizeMode: "contain",
          }}
          source={{
            uri: data.image,
          }}
        />
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

      <View className="p-[16px] flex-1 justify-between">
        <Text
          cn={clsx("text-[#0E333C]", variantsStyles.titleText)}
          numberOfLines={3}
        >
          <Text font="extraBold">{data.brand}</Text>
          <Text font="semiBold" cn="text-[#0E333C]">
            {data.name}
          </Text>
        </Text>

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
