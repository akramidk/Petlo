import { usePathname } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HEDER_PATHS, MENU_PATHS } from "../src/constants";

interface ViewerProps {
  children: React.ReactNode;
}

const Viewer = ({ children }: ViewerProps) => {
  const pathname = usePathname();
  const hideHeder = HEDER_PATHS.includes(pathname);
  const showMenu = MENU_PATHS.includes(pathname);

  if (hideHeder && !showMenu) {
    return (
      <SafeAreaView className="px-[28px] py-[12px]">{children}</SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full flex flex-col">
      {!hideHeder && <View className="h-[56px] bg-[#888]"></View>}
      <View className="grow p-[28px]">{children}</View>
      {showMenu && <View className="h-[76px] bg-[#888]"></View>}
    </SafeAreaView>
  );
};

export default Viewer;
