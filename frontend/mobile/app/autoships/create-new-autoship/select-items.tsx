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
      viewCN="min-h-full"
    >
      <ItemsViewer
        items={items}
        renderItem={() => {
          return <></>;
        }}
        detailsTranslationValue="Payme"
        totalTranslationValue="Tot"
      />

      <View className="absolute self-center bottom-[16px]">
        <BaseButton
          cn="bg-[#6BADAE] px-[32px] py-[20px] rounded-full shadow-lg"
          onClick={() => {}}
        >
          <Text font="bold" cn="text-[#fff] text-[14px]">
            Add an Item
          </Text>
        </BaseButton>
      </View>
    </PageStructure>
  );
};

export default SelectItems;
