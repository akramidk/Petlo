import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { HEDER_ICONS } from "../../constants";
import { useCartContext } from "../../hooks";
import { HeaderButton, Logo } from "../atoms";

interface HeaderProps {
  activePath: string;
  showSearchIcon: boolean;
  showCartIcon: boolean;
}

const Header = ({ activePath, showSearchIcon, showCartIcon }: HeaderProps) => {
  const router = useRouter();
  const { numberOfItems } = useCartContext();

  return (
    <View className="flex-row h-[48px] px-[28px] bg-[#fff] border-b-[1px] border-b-[#f6f6f6] justify-between items-start pt-[6px]">
      <Logo cn="text-[22px]" />

      {(showSearchIcon || showCartIcon) && (
        <View className="flex-row">
          {HEDER_ICONS.map((icon, i) => {
            if (
              (icon.id === "SEARCH" && !showSearchIcon) ||
              (icon.id === "CART" && !showCartIcon)
            )
              return;

            return (
              <View key={i} className="ml-[16px]">
                {icon.id === "CART" && showCartIcon && numberOfItems > 0 && (
                  <View className="h-[10px] w-[10px] absolute z-10 rounded-full bg-[#E64848] border-[1px] border-[#fff]"></View>
                )}
                <HeaderButton
                  icon={icon.id}
                  selected={icon.path === activePath}
                  onClick={() => router.push(icon.path)}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Header;
