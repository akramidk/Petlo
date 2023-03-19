import { Text, View } from "react-native";

interface HeaderProps {
  activePath: string;
}

const Header = () => {
  return (
    <View className="flex-row h-[44px] px-[28px] bg-[#fff] border-b-[1px] border-b-[#f6f6f6] justify-between">
      <Text className="font-chillax-bold text-[22px] text-[#0E333C]">
        petlo
      </Text>

      <View>
        <Text>jjjj</Text>
      </View>
    </View>
  );
};

export default Header;
