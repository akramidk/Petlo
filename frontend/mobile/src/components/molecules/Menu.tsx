import { Text, View } from "react-native";
import { MENU_PATHS, MENU_TABS } from "../../constants";
import { MenuTabButton } from "../atoms";
import { useTranslationsContext } from "../../hooks";
import { useRouter } from "expo-router";
import { Fragment } from "react";

interface MenuProps {
  activePath: typeof MENU_PATHS[number];
}

const Menu = ({ activePath }: MenuProps) => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <View className="h-[64px] flex-row justify-between items-end px-[4px] border-t-[1px] border-t-[#f6f6f6] bg-[#fff]">
      {MENU_TABS.map((tap, i) => (
        <Fragment key={i}>
          <MenuTabButton
            icon={tap.id}
            value={t(tap.value)}
            selected={activePath === tap.path}
            onClick={() => router.replace(tap.path)}
          />
        </Fragment>
      ))}
    </View>
  );
};

export default Menu;
