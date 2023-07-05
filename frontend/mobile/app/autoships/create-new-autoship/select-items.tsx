import { useRouter } from "expo-router";
import { useState } from "react";
import { ItemsViewer, PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import { CartItemProps } from "../../../src/interfaces";
import { BaseButton } from "../../../src/components/bases";
import { Text } from "../../../src/components/atoms";
import SearchAndSelectItems from "./components/SearchAndSelectItems";

const SelectItems = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [items, setItems] = useState<CartItemProps[]>();
  const [showSearchAndSelectItems, setShowSearchAndSelectItems] =
    useState(false);

  return (
    <>
      {showSearchAndSelectItems && (
        <SearchAndSelectItems
          onClose={() => setShowSearchAndSelectItems(false)}
          addItem={(item, selectedVariantId) =>
            console.log(item, selectedVariantId)
          }
        />
      )}

      <PageStructure
        title={t("CREATE_AN_AUTOSHIP__STEPS.WHAT.PRIMARY_TEXT")}
        link={{ value: t("COMMON__CANCEL"), onClick: router.back }}
        helperText={
          items === undefined
            ? t("CREATE_AN_AUTOSHIP__NO_ITEMS_ADDED")
            : undefined
        }
        button={{
          value: t("COMMON__SAVE"),
          onClick: () => {
            router.back();
          },
          status: "inactive",
        }}
        floatingElementCN="bottom-[152px]"
        floatingElement={
          <BaseButton
            cn="bg-[#6BADAE] px-[32px] py-[20px] rounded-full shadow-lg"
            onClick={() => setShowSearchAndSelectItems(true)}
          >
            <Text font="bold" cn="text-[#fff] text-[14px]">
              {t("CREATE_AN_AUTOSHIP__ADD_AN_ITEM")}
            </Text>
          </BaseButton>
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
    </>
  );
};

export default SelectItems;
