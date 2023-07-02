import { useRouter } from "expo-router";
import { useState } from "react";
import { ItemsViewer, PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import { CartItemProps } from "../../../src/interfaces";
import { View } from "react-native";
import { BaseButton } from "../../../src/components/bases";
import { Text } from "../../../src/components/atoms";

const SelectItems = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [items, setItems] = useState<CartItemProps[]>();

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__STEPS.WHAT.PRIMARY_TEXT")}
      link={{ value: t("COMMON__CANCEL"), onClick: router.back }}
      helperText={
        items === undefined
          ? t("CREATE_AN_AUTOSHIP__NO_ITEMS_ADDED")
          : undefined
      }
    >
      <ItemsViewer
        items={items}
        renderItem={() => {
          return <></>;
        }}
        detailsTranslationValue="Payme"
        totalTranslationValue="Tot"
      />
    </PageStructure>
  );
};

export default SelectItems;
