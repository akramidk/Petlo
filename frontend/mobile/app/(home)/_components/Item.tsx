import { Image, View } from "react-native";
import { Text } from "../../../src/components/atoms";
import { SectionItem } from "../../../src/interfaces";

const Item = ({ public_id, name, brand, image, variants }: SectionItem) => {
  return (
    <View className="w-[200px] h-[325] rounded-[4px] border-[1px] border-[#f6f6f6]">
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
      </View>

      <View className="p-[16px] flex-1 justify-between">
        <Text className="text-[#0E333C] text-[14px]">
          <Text font="extraBold">{brand}</Text>{" "}
          <Text font="semiBold">{name}</Text>
        </Text>

        <Text font="extraBold" cn="text-[#0E333C] text-[16px]">
          {`${variants.prices.min} ${variants.prices.currency}`}
        </Text>
      </View>
    </View>
  );
};

export default Item;
