import { Text, View } from "react-native";
import { MENU_PATHS, MENU_TABS } from "../../constants";

interface MenuProps {
  activePath: typeof MENU_PATHS[number];
}

const Menu = ({ activePath }: MenuProps) => {
  return (
    <View className="h-[76px] flex-row justify-between items-center px-[28px] border-t-[1px] border-t-[#f6f6f6] bg-[#fff]">
      {MENU_TABS.map((tap) => (
        <Text>{tap.value}</Text>
      ))}
    </View>
  );
};

export default Menu;
