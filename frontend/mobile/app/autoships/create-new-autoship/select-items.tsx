import { useRouter } from "expo-router";
import { useState } from "react";
import { ItemsViewer, PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import { CartItemProps, Item } from "../../../src/interfaces";
import { BaseButton } from "../../../src/components/bases";
import { Text } from "../../../src/components/atoms";
import SearchAndSelectItems from "./components/SearchAndSelectItems";
import { ItemViewer } from "../../../src/components/molecules";

//TODO the calculation should hapeend in the back

const SelectItems = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [items, setItems] = useState<CartItemProps[]>();
  const [showSearchAndSelectItems, setShowSearchAndSelectItems] =
    useState(false);

  const addItemHandler = (item: Item, selectedVariantId: string) => {
    let _item = items?.find((_item) => _item.itemId === item.public_id);

    if (_item) {
      _item.quantity += 1;
      _item.amount = (
        Number(_item.amount) + Number(_item.variantPrice)
      ).toFixed(2);
    } else {
      const variant = item.variants.find(
        (variant) => variant.public_id === selectedVariantId
      );

      _item = {
        itemId: item.public_id,
        variantId: selectedVariantId,
        options: variant.options.map((option) => option.value),
        name: item.name,
        image: item.image,
        amount: variant.price,
        quantity: 1,
        variantPrice: variant.price,
      };
    }

    setItems([...(items ?? []), _item]);
  };

  return (
    <>
      {showSearchAndSelectItems && (
        <SearchAndSelectItems
          onClose={() => setShowSearchAndSelectItems(false)}
          addItem={addItemHandler}
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
          renderItem={(item) => {
            return (
              <ItemViewer
                {...item}
                add={() =>
                  setItems([
                    ...items,
                    {
                      ...item,
                      quantity: item.quantity + 1,
                      amount: (
                        Number(item.amount) + Number(item.variantPrice)
                      ).toFixed(2),
                    },
                  ])
                }
                remove={() => () => {
                  setItems([
                    ...items,
                    {
                      ...item,
                      quantity: item.quantity - 1,
                      amount: (
                        Number(item.amount) - Number(item.variantPrice)
                      ).toFixed(2),
                    },
                  ]);
                }}
              />
            );
          }}
          detailsTranslationValue="Payme"
          totalTranslationValue="Tot"
        />
      </PageStructure>
    </>
  );
};

export default SelectItems;
