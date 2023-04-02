import { Image, Text, View } from "react-native";

const Item = ({ name, image }) => {
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

      <View className="p-[16px] space-y-[12px]">
        <Text numberOfLines={3}>{name}</Text>
        <Text>20.99 JOD</Text>
      </View>
    </View>
  );
};

export default Item;
