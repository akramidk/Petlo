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
import { SectionItem } from "../../../src/interfaces";

const Item = ({ public_id, name, brand, image, variants }: SectionItem) => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { languageWithoutGender, direction } = useInternationalizationContext();

  const price = useMemo(() => {
    const min = variants.prices.min;
    const max = variants.prices.max;
    if (min === max) return `${min}`;

    return `${min} - ${max}`;
  }, [variants.prices]);

  const numberOfOptionsInside = useMemo(() => {
    const number = variants.number;

    if (languageWithoutGender === "en")
      return `${number} ${t("HOME__OPTIONS_INSIDE")}`;

    if (number === 2) return t("HOME__OPTIONS_INSIDE_2");
    if (number <= 10)
      return `${number} ${t("HOME__OPTIONS_INSIDE_3_AND_ABOVE")}`;
    if (number > 10)
      return `${number} ${t("HOME__OPTIONS_INSIDE_11_AND_ABOVE")}`;
  }, [variants.number]);

  return (
    <BaseButton
      className="w-[200px] h-[325] rounded-[4px] border-[1px] border-[#f6f6f6]"
      onClick={() => router.push(`/item?publicId=${public_id}`)}
    >
      <View className="p-[28px] h-[172px] bg-[#F9F9F9]">
        <Image
          style={{
            flex: 1,
            resizeMode: "contain",
          }}
          source={{
            uri: image,
          }}
        />
        {variants.number > 1 && (
          <View
            className={clsx(
              "bg-[#0E333C] absolute mt-[12px] py-[6px] px-[10px] rounded-[4px] opacity-[.92]",
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
        <Text cn="text-[#0E333C] text-[14px]">
          <Text font="extraBold">{brand}</Text>{" "}
          <Text font="semiBold" cn="text-[#0E333C]">
            {name}
          </Text>
        </Text>

        <Text font="extraBold" cn="text-[#0E333C] text-[16px]">
          {`${price} ${variants.prices.currency}`}
        </Text>
      </View>
    </BaseButton>
  );
};

export default Item;
