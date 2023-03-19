import BaseButton from "../bases/BaseButton";
import {
  MagnifyingGlassIcon as SearchSelected,
  ShoppingBagIcon as CartSelected,
} from "react-native-heroicons/solid";
import {
  MagnifyingGlassIcon as SearchUnselected,
  ShoppingBagIcon as CartUnselected,
} from "react-native-heroicons/outline";

interface HeaderButtonProps {
  icon: string;
  selected: boolean;
  onClick: () => void;
}

const HeaderButton = ({ icon, selected, onClick }: HeaderButtonProps) => {
  return (
    <BaseButton cn="ml-[12px]" onClick={onClick}>
      <Icon icon={icon} selected={selected} />
    </BaseButton>
  );
};

const Icon = ({
  icon,
  selected,
}: Pick<HeaderButtonProps, "icon" | "selected">) => {
  const props = {
    size: 24,
    color: selected ? "#0E333C" : "#777777",
    strokeWidth: 2,
  };

  switch (icon) {
    case "SEARCH":
      return selected ? (
        <SearchSelected {...props} />
      ) : (
        <SearchUnselected {...props} />
      );

    case "CART":
      return selected ? (
        <CartSelected {...props} />
      ) : (
        <CartUnselected {...props} />
      );
  }
};

export default HeaderButton;
