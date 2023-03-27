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
import * as Device from "expo-device";

interface MenuProps {
  activePath: string;
}

const Menu = ({ activePath }: MenuProps) => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();
  const isIOS = Device.brand.toLowerCase() === "apple";

  return (
    <View
      className={clsx(
        "justify-between px-[4px] border-t-[1px] border-t-[#f6f6f6] bg-[#fff]",
        direction === "ltr" ? "flex-row" : "flex-row-reverse",
        isIOS ? "pt-[16px]" : "py-[16px]"
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
