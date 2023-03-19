import { useRouter } from "expo-router";
import { Fragment } from "react";
import { Text, View } from "react-native";
import { HEDER_ICONS } from "../../constants";
import { HeaderButton } from "../atoms";

interface HeaderProps {
  activePath: string;
}

const Header = ({ activePath }: HeaderProps) => {
  const router = useRouter();

  return (
    <View className="flex-row h-[40px] px-[28px] bg-[#fff] border-b-[1px] border-b-[#f6f6f6] justify-between items-start">
      <Text className="font-chillax-bold text-[22px] text-[#0E333C]">
        petlo
      </Text>

      <View className="flex-row">
        {HEDER_ICONS.map((icon, i) => {
          return (
            <View key={i} className="ml-[16px]">
              <HeaderButton
                icon={icon.id}
                selected={icon.path === activePath}
                onClick={() => router.replace(icon.path)}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Header;
