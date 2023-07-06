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

  const changeQuantity = (
    itemId: string,
    variantId: string,
    operation: "add" | "remove"
  ) => {
    let itemsCopy = [...items];
    const itemIndex = itemsCopy.findIndex(
      (item) => item.itemId === itemId && item.variantId === variantId
    );
    const item = itemsCopy[itemIndex];

    if (operation === "add") {
      item.quantity = item.quantity + 1;
      item.amount = (Number(item.amount) + Number(item.variantPrice)).toFixed(
        2
      );
    } else if (operation === "remove") {
      if (item.quantity === 1) {
        itemsCopy = itemsCopy.filter(
          (_item) =>
            _item.itemId !== item.itemId || _item.variantId !== item.variantId
        );
      } else {
        item.quantity = item.quantity - 1;
        item.amount = (Number(item.amount) - Number(item.variantPrice)).toFixed(
          2
        );
      }
    }

    setItems(itemsCopy);
  };

  const addItemHandler = (item: Item, selectedVariantId: string) => {
    const _items = [...(items ?? [])];
    const variant = item.variants.find(
      (variant) => variant.public_id === selectedVariantId
    );

    const isItemAddedBefore = _items.find(
      (_item) =>
        _item.itemId === item.public_id && _item.variantId === variant.public_id
    );

    if (isItemAddedBefore) {
      changeQuantity(item.public_id, variant.public_id, "add");
      return;
    }

    _items.push({
      itemId: item.public_id,
      variantId: selectedVariantId,
      options: variant.options.map((option) => option.value),
      name: item.name,
      image: item.image,
      amount: variant.price,
      quantity: 1,
      variantPrice: variant.price,
    });

    setItems(_items);
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
                add={(itemId, variantId) =>
                  changeQuantity(itemId, variantId, "add")
                }
                remove={(itemId, variantId) =>
                  changeQuantity(itemId, variantId, "remove")
                }
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
