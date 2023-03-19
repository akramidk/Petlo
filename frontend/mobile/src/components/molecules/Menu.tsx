import { View } from "react-native";
import { MENU_TABS } from "../../constants";
import { MenuTabButton } from "../atoms";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../hooks";
import { useRouter } from "expo-router";
import { Fragment } from "react";
import clsx from "clsx";

interface MenuProps {
  activePath: string;
}

const Menu = ({ activePath }: MenuProps) => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  return (
    <View
      className={clsx(
        "h-[64px] justify-between items-end px-[4px] border-t-[1px] border-t-[#f6f6f6] bg-[#fff]",
        direction === "ltr" ? "flex-row" : "flex-row-reverse"
      )}
    >
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
