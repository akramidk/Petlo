import BaseButton from "../bases/BaseButton";
import Text from "./Text";
import {
  HomeIcon as HomeUnselected,
  ShoppingCartIcon as OrdersUnselected,
  ClockIcon as AutoshipUnselected,
  RectangleStackIcon as MoreUnselected,
} from "react-native-heroicons/outline";

import {
  HomeIcon as HomeSelected,
  ShoppingCartIcon as OrdersSelected,
  ClockIcon as AutoshipSelected,
  RectangleStackIcon as MoreSelected,
} from "react-native-heroicons/solid";

import { View } from "react-native";
import clsx from "clsx";

interface TabBarButtonProps {
  value: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

const MenuTabButton = ({
  onClick,
  icon,
  value,
  selected,
}: TabBarButtonProps) => {
  const Icon = () => {
    const props = {
      size: 22,
      color: selected ? "#0E333C" : "#777777",
      strokeWidth: 2,
    };

    switch (icon) {
      case "HOME":
        return selected ? (
          <HomeSelected {...props} />
        ) : (
          <HomeUnselected {...props} />
        );
      case "ORDERS":
        return selected ? (
          <OrdersSelected {...props} />
        ) : (
          <OrdersUnselected {...props} />
        );
      case "AUTOSHIP":
        return selected ? (
          <AutoshipSelected {...props} />
        ) : (
          <AutoshipUnselected {...props} />
        );
      case "MORE":
        return selected ? (
          <MoreSelected {...props} />
        ) : (
          <MoreUnselected {...props} />
        );
    }
  };

  return (
    <BaseButton cn="flex-1 items-center justify-center" onClick={onClick}>
      <View className="items-center space-y-[6px]">
        <Icon />
        <Text
          cn={clsx(
            "text-[12.5px]",
            selected ? "text-[#0E333C]" : "text-[#777777]"
          )}
          font={selected ? "extraBold" : "bold"}
        >
          {value}
        </Text>
      </View>
    </BaseButton>
  );
};

export default MenuTabButton;
