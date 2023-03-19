import { usePathname } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Menu } from "../src/components/molecules";
import { HEDER_PATHS, MENU_PATHS } from "../src/constants";

interface ViewerProps {
  children: React.ReactNode;
}

const Viewer = ({ children }: ViewerProps) => {
  const pathname = usePathname();
  const hideHeder = HEDER_PATHS.includes(pathname);
  const showMenu = (MENU_PATHS as ReadonlyArray<string>).includes(pathname);

  if (hideHeder && !showMenu) {
    return (
      <SafeAreaView className="px-[28px] py-[12px]">{children}</SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full flex flex-col">
      {!hideHeder && <Header />}
      <View className="grow p-[28px]">{children}</View>
      {showMenu && <Menu activePath={pathname as typeof MENU_PATHS[number]} />}
    </SafeAreaView>
  );
};

export default Viewer;
