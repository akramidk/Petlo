import clsx from "clsx";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { Link, Text, Icon } from "../../../src/components/atoms";
import { BaseButton } from "../../../src/components/bases";
import { useInternationalizationContext } from "../../../src/hooks";
import { Section as SectionProps } from "../../../src/interfaces";
import Item from "./Item";

const Section = ({ name, category, items }: SectionProps) => {
  const router = useRouter();
  const { direction } = useInternationalizationContext();

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

        <Link
          onClick={() => router.push(`/category?name=${category}`)}
          value="Show All"
          valueCN="text-[14px] text-[#777]"
          font="bold"
        />
      </View>

      <ScrollView
        className="space-x-[8px]"
        contentContainerStyle={{
          paddingHorizontal: 28,
        }}
        horizontal
      >
        {items.data.map((item, i) => {
          return (
            <View key={i}>
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
              name="arrowRightCircleIcon"
              color="#0E333C"
              size={32}
              solid={false}
              strokeWidth={1.1}
            />

            <Text font="medium" cn="text-[#0E333C] text-[14px]">
              Show All Items
            </Text>
          </BaseButton>
        )}
      </ScrollView>
    </View>
  );
};

export default Section;
