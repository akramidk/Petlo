import { usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Menu } from "../src/components/molecules";
import { HEDER_ICONS_PATHS, HEDER_PATHS, MENU_PATHS } from "../src/constants";
import { useCustomerContext } from "../src/hooks";

interface ViewerProps {
  children: React.ReactNode;
}

const Viewer = ({ children }: ViewerProps) => {
  const pathname = usePathname();
  const { customer } = useCustomerContext();
  const hideHeder = HEDER_PATHS.includes(pathname);
  const showMenuAndIcons =
    (MENU_PATHS as ReadonlyArray<string>).includes(pathname) ||
    pathname.includes("/brands/") ||
    pathname.includes("/categories/");

  if (pathname === "/welcome") {
    return <>{children}</>;
  }

  if (hideHeder && !showMenuAndIcons) {
    return <SafeAreaView className="h-full">{children}</SafeAreaView>;
  }

  const showHeaderIcons = !!HEDER_ICONS_PATHS.find((path) =>
    pathname.includes(path)
  );

  return (
    <SafeAreaView className="h-full flex flex-col">
      {!hideHeder && (
        <Header
          activePath={pathname}
          showSearchIcon={showHeaderIcons}
          showCartIcon={customer && showHeaderIcons}
        />
      )}
      {children}
      {showMenuAndIcons && (
        <Menu activePath={pathname} isCustomer={!!customer} />
      )}
    </SafeAreaView>
  );
};

export default Viewer;
