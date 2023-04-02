import { View } from "react-native";
import { Text } from "../../../src/components/atoms";
import { Section as SectionProps } from "../../../src/interfaces";

const Section = ({ name, category }: SectionProps) => {
  return (
    <View>
      <View className="flex-row justify-between items-center">
        <Text cn="text-[22px] text-[#0E333C]" font="extraBold">
          {name}
        </Text>
        <Text font="bold">Show All</Text>
      </View>
    </View>
  );
};

export default Section;
