import clsx from "clsx";
import { ScrollView, View } from "react-native";
import { Text } from "../../../src/components/atoms";
import { useInternationalizationContext } from "../../../src/hooks";
import { Section as SectionProps } from "../../../src/interfaces";
import Item from "./Item";

const Section = ({ name, category, items }: SectionProps) => {
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
        <Text cn="text-[14px] text-[#777]" font="bold">
          Show All
        </Text>
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
              <Item {...item} publicId={item.public_id} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Section;
