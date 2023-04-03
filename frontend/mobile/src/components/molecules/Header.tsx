import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { HEDER_ICONS } from "../../constants";
import { HeaderButton, Logo } from "../atoms";

interface HeaderProps {
  activePath: string;
  showIcons: boolean;
}

const Header = ({ activePath, showIcons }: HeaderProps) => {
  const router = useRouter();

  return (
    <View className="flex-row h-[48px] px-[28px] bg-[#fff] border-b-[1px] border-b-[#f6f6f6] justify-between items-start pt-[6px]">
      <Logo cn="text-[22px]" />

      {showIcons && (
        <View className="flex-row">
          {HEDER_ICONS.map((icon, i) => {
            return (
              <View key={i} className="ml-[16px]">
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
