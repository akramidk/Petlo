import clsx from "clsx";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { Link, Text } from "../../../src/components/atoms";
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
      </ScrollView>
    </View>
  );
};

export default Section;
