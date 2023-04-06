import { View, Image } from "react-native";
import { Text } from "../../src/components/atoms";
import { CartItemProps } from "../../src/interfaces";

const Item = ({
  itemPublicId,
  variantPublicId,
  name,
  image,
  quantity,
  amount,
}: CartItemProps) => {
  return (
    <View className="h-[200px]">
      <Text>{name}</Text>
    </View>
  );
};

export default Item;
