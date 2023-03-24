import { usePathname } from "expo-router";
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
      {!hideHeder && <Header activePath={pathname} />}
      {children}
      {showMenu && <Menu activePath={pathname} />}
    </SafeAreaView>
  );
};

export default Viewer;
