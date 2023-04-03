import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, View } from "react-native";
import { Text } from "../../../src/components/atoms";
import { BaseButton } from "../../../src/components/bases";
import { SectionItem } from "../../../src/interfaces";

const Item = ({ public_id, name, brand, image, variants }: SectionItem) => {
  const router = useRouter();

  const price = useMemo(() => {
    const min = variants.prices.min;
    const max = variants.prices.max;
    if (min === max) return `${min}`;

    return `${min} - ${max}`;
  }, [variants.prices]);

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
