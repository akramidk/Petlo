import { Image, View } from "react-native";
import { Text } from "../../../src/components/atoms";
import { Section } from "../../../src/interfaces";

interface ItemProps {
  publicId: string;
  name: string;
  brand: string;
  image: string;
  variants: {
    number: number;
    prices: {
      min: number;
      max: number;
      currency: string;
    };
  };
}

const Item = ({ publicId, name, brand, image, variants }: ItemProps) => {
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

        <Text font="extraBold" cn="text-[#0E333C] text-[15px]">
          {`${variants.prices.min} ${variants.prices.currency}`}
        </Text>
      </View>
    </View>
  );
};

export default Item;
