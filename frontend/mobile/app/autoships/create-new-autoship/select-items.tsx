import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ItemsViewer, PageStructure } from "../../../src/components/organisms";
import { useAPIMutation, useTranslationsContext } from "../../../src/hooks";
import {
  CalculateAutoshipItemsAmountRequest,
  CalculateAutoshipItemsAmountResponse,
  CartItemProps,
  Item,
} from "../../../src/interfaces";
import { BaseButton } from "../../../src/components/bases";
import { Text } from "../../../src/components/atoms";
import SearchAndSelectItems from "./components/SearchAndSelectItems";
import { ItemViewer } from "../../../src/components/molecules";
import { Endpoints } from "../../../src/enums";

//TODO the calculation should hapeend in the back

const SelectItems = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [selectedItems, setSelectedItems] = useState<
    {
      itemId: string;
      variantId: string;
      quantity: number;
    }[]
  >();

  const [savedCalculationResponse, setSavedCalculationResponse] =
    useState<CalculateAutoshipItemsAmountResponse>();

  const [showSearchAndSelectItems, setShowSearchAndSelectItems] =
    useState(false);

  const add = (itemId: string, variantId: string) => {
    const selectedItemsCopy = [...(selectedItems ?? [])];
    const isItemAddedBefore = selectedItemsCopy.find(
      (item) => item.itemId === itemId && item.variantId === variantId
    );

    if (isItemAddedBefore) {
      isItemAddedBefore.quantity += 1;
    } else {
      selectedItemsCopy.push({
        itemId: itemId,
        variantId: variantId,
        quantity: 1,
      });
    }

    setSelectedItems(selectedItemsCopy);
  };

  const remove = (itemId: string, variantId: string) => {
    let selectedItemsCopy = [...selectedItems];
    const item = selectedItemsCopy.find(
      (item) => item.itemId === itemId && item.variantId === variantId
    );

    if (item) {
      item.quantity -= 1;

      if (item.quantity === 0) {
        selectedItemsCopy = selectedItemsCopy.filter(
          (item) => item.itemId !== itemId || item.variantId !== variantId
        );
      }

      setSelectedItems(selectedItemsCopy);
    }
  };

  const { response: calculationResponse, trigger: calculationTrigger } =
    useAPIMutation<
      CalculateAutoshipItemsAmountRequest,
      CalculateAutoshipItemsAmountResponse
    >({
      endpoint: Endpoints.AUTOSHIP_ITEMS_CALCULATION,
      method: "POST",
      options: {},
    });

  const items: CartItemProps[] = useMemo(() => {
    if (savedCalculationResponse === undefined) return items;

    const array: CartItemProps[] = [];
    savedCalculationResponse.items.forEach((item) => {
      item.variants.forEach((variant) => {
        array.push({
          itemId: item.public_id,
          variantId: variant.public_id,
          options: variant.options,
          name: item.name,
          image: item.image,
          quantity: variant.quantity,
          amount: `${variant.amount} ${savedCalculationResponse.currency}`,
        });
      });
    });

    return array;
  }, [savedCalculationResponse]);

  useEffect(() => {
    if (
      calculationResponse === undefined ||
      calculationResponse.status === "loading"
    )
      return;

    setSavedCalculationResponse(calculationResponse.body);
  }, [calculationResponse]);

  useEffect(() => {
    if (selectedItems === undefined || selectedItems.length === 0) return;

    calculationTrigger({
      data: selectedItems.map((item) => {
        return {
          item_id: item.itemId,
          variant_id: item.variantId,
          quantity: item.quantity,
        };
      }),
    });
  }, [selectedItems]);

  return (
    <>
      {showSearchAndSelectItems && (
        <SearchAndSelectItems
          onClose={() => setShowSearchAndSelectItems(false)}
          addItem={add}
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
            return <ItemViewer {...item} add={add} remove={remove} />;
          }}
          totalTranslationValue="Total Amount"
          amount={savedCalculationResponse?.amount}
          currency={savedCalculationResponse?.currency}
          isAmountLoading={calculationResponse?.status === "loading"}
        />
      </PageStructure>
    </>
  );
};

export default SelectItems;
