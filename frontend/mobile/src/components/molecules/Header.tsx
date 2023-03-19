import { Text, View } from "react-native";
import { Logo } from "../atoms";
import Svg, { Path } from "react-native-svg";

const Header = () => {
  return (
    <View className="h-[48px] bg-[#fff] border-b-[1px] border-b-[#f6f6f6]">
      <Text>petlo</Text>
    </View>
  );
};

export default Header;
