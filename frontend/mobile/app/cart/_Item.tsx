import { Fragment } from "react";
import { View, Image } from "react-native";
import { Link, Text } from "../../src/components/atoms";
import { CartItemProps } from "../../src/interfaces";

const Item = ({
  options,
  name,
  image,
  quantity,
  amount,
  add,
  addStatus,
  remove,
}: CartItemProps) => {
  console.log("addStatus");
  return (
    <View className="flex-row space-x-[16px] h-[72px]">
      <View className="h-[72px] w-[72px] p-[12px] bg-[#f9f9f9]">
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

      <View className="flex-1">
        <View className="space-y-[2px]">
          <Text
            font="bold"
            cn="text-[#0E333C] text-[14.5px]"
            style={{
              overflow: "hidden",
            }}
            numberOfLines={1}
          >
            {name}
          </Text>

          <View className="flex-row space-x-[6px]">
            {options.map((option, i) => {
              return (
                <View key={i}>
                  <Text font="medium" cn="text-[#777] text-[14px]">
                    {option}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className="absolute bottom-0">
          <Text font="semiBold" cn="text-[#666] text-[14.5px]">
            {amount}
          </Text>
        </View>

        <View className="absolute bottom-0 self-end flex-row items-center">
          <Link
            onClick={() => {}}
            value="-"
            cn="px-[12px]"
            valueCN="text-[16px]"
          />
          <Text>{quantity}</Text>
          <Link
            onClick={add}
            value="+"
            status={addStatus}
            cn="px-[12px]"
            valueCN="text-[16px]"
          />
        </View>
      </View>
    </View>
  );
};

export default Item;
