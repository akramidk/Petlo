import clsx from "clsx";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { ScrollView, View } from "react-native";
import { Link, Text, Icon } from "../../../src/components/atoms";
import { BaseButton } from "../../../src/components/bases";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import { Section as SectionProps } from "../../../src/interfaces";
import Item from "./Item";

const Section = ({ name, category, items }: SectionProps) => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();
  const scrollViewRef = useRef<ScrollView>();

  return (
    <View className="space-y-[12px] p-[0px]">
      <View
        className={clsx(
          "justify-between items-center px-[28px]",
          direction === "ltr" ? "flex-row" : "flex-row-reverse"
        )}
      >
        <Text cn="text-[22px] text-[#0E333C]" font="extraBold">
          {name}
        </Text>

        {items.has_more && (
          <Link
            onClick={() => router.push(`/category?name=${category}`)}
            value={t("HOME__SECTION_SHOW_ALL_BUTTON")}
            valueCN="text-[14px] text-[#777]"
            font="bold"
          />
        )}
      </View>

      <ScrollView
        className={direction === "ltr" ? "self-start" : "self-end"}
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingHorizontal: 28,
          flexDirection: direction === "ltr" ? "row" : "row-reverse",
        }}
        onContentSizeChange={
          direction === "rtl"
            ? () => scrollViewRef.current?.scrollToEnd({ animated: false })
            : undefined
        }
        horizontal
      >
        {items.data.map((item, i) => {
          return (
            <View
              key={i}
              className={direction === "ltr" ? "mr-[8px]" : "ml-[8px]"}
            >
              <Item {...item} />
            </View>
          );
        })}

        {items.has_more && (
          <BaseButton
            className="w-[200px] h-[325] rounded-[4px] border-[1px] border-[#f6f6f6] items-center justify-center space-y-[8px]"
            onClick={() => router.push(`/category?name=${category}`)}
          >
            <Icon
              name={
                direction === "ltr"
                  ? "arrowRightCircleIcon"
                  : "arrowLeftCircleIcon"
              }
              color="#0E333C"
              size={32}
              solid={false}
              strokeWidth={1.1}
            />

            <Text font="medium" cn="text-[#0E333C] text-[14px]">
              {t("HOME__SECTION_SHOW_ALL_ITEMS_CARD")}
            </Text>
          </BaseButton>
        )}
      </ScrollView>
    </View>
  );
};

export default Section;
