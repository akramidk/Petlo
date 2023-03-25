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
  const showMenuAndIcons = (MENU_PATHS as ReadonlyArray<string>).includes(
    pathname
  );

  if (hideHeder && !showMenuAndIcons) {
    return <SafeAreaView className="h-full">{children}</SafeAreaView>;
  }

  return (
    <SafeAreaView className="h-full flex flex-col">
      {!hideHeder && (
        <Header activePath={pathname} showIcons={showMenuAndIcons} />
      )}
      {children}
      {showMenuAndIcons && <Menu activePath={pathname} />}
    </SafeAreaView>
  );
};

export default Viewer;
