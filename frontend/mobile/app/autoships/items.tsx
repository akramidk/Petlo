import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ItemsViewer, PageStructure } from "../../src/components/organisms";
import {
  useAPIMutation,
  useDataContext,
  useTranslationsContext,
} from "../../src/hooks";
import {
  CalculateAutoshipItemsAmountRequest,
  CalculateAutoshipItemsAmountResponse,
  CartItemProps,
  ChangeAutoshipItemsRequest,
  ChangeAutoshipItemsResponse,
  Item,
} from "../../src/interfaces";
import { BaseButton } from "../../src/components/bases";
import { Text } from "../../src/components/atoms";
import SearchAndSelectItems from "./components/SearchAndSelectItems";
import { ItemViewer } from "../../src/components/molecules";
import { Endpoints } from "../../src/enums";
import { Loading } from "../../src/components/pages";

const Items = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();
  const { type, publicId } = useSearchParams();

  const isChange = type === "change";

  const [selectedItems, setSelectedItems] = useState<
    {
      itemId: string;
      variantId: string;
      quantity: number;
    }[]
  >(data?.selectedItems);

  const [savedCalculationResponse, setSavedCalculationResponse] =
    useState<CalculateAutoshipItemsAmountResponse>(data?.itemsCalculation);

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

  const {
    response: calculationResponse,
    trigger: calculationTrigger,
    status: calculationStatus,
  } = useAPIMutation<
    CalculateAutoshipItemsAmountRequest,
    CalculateAutoshipItemsAmountResponse
  >({
    endpoint: Endpoints.AUTOSHIP_ITEMS_CALCULATION,
    method: "POST",
    options: {
      resetSucceededStatusAfter: 2000,
    },
  });

  const items: CartItemProps[] = useMemo(() => {
    if (
      !savedCalculationResponse ||
      savedCalculationResponse.items.length === 0
    )
      return;

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

  const itemsData =
    (data?.itemsCalculation as CalculateAutoshipItemsAmountResponse)?.items ??
    [];
  const responseItems = savedCalculationResponse?.items ?? [];

  const isSaveButtonActive = useMemo(() => {
    if (itemsData.length === 0 && responseItems.length === 0) return false;

    const savedItems: { id: string; variantId: string; quantity: number }[] =
      [];
    itemsData.forEach((item) => {
      item.variants.forEach((variant) => {
        savedItems.push({
          id: item.public_id,
          variantId: variant.public_id,
          quantity: variant.quantity,
        });
      });
    });

    let newItems: { id: string; variantId: string; quantity: number }[] = [];
    responseItems.forEach((item) => {
      item.variants.forEach((variant) => {
        newItems.push({
          id: item.public_id,
          variantId: variant.public_id,
          quantity: variant.quantity,
        });
      });
    });

    const isSavedItemsStillExistAndQuantityNotChanged = savedItems.every(
      (savedItem) => {
        const isStillExistAndQuantityNotChanged = newItems.find(
          (newItem) =>
            newItem.id === savedItem.id &&
            newItem.variantId === savedItem.variantId &&
            newItem.quantity === savedItem.quantity
        );

        console.log(
          "isStillExistAndQuantityNotChanged",
          isStillExistAndQuantityNotChanged
        );

        if (isStillExistAndQuantityNotChanged) {
          newItems = newItems.filter(
            (newItem) =>
              newItem.id !== savedItem.id ||
              newItem.variantId !== savedItem.variantId
          );
        }

        return isStillExistAndQuantityNotChanged;
      }
    );

    if (isSavedItemsStillExistAndQuantityNotChanged && newItems.length === 0)
      return false;

    return true;
  }, [itemsData, responseItems]);

  const { trigger, status } = useAPIMutation<
    ChangeAutoshipItemsRequest,
    ChangeAutoshipItemsResponse
  >({
    endpoint: Endpoints.CHANGE_AUTOSHIP_ITEMS,
    method: "PATCH",
    options: {
      onSucceeded: () => {
        setData(undefined);
        router.back();
      },
      fireOnSucceededAfter: 1000,
    },
    slugs: {
      publicId: publicId,
    },
  });

  useEffect(() => {
    if (
      calculationResponse === undefined ||
      calculationResponse.status === "loading"
    )
      return;

    setSavedCalculationResponse(calculationResponse.body);
  }, [calculationResponse]);

  useEffect(() => {
    if (selectedItems === undefined) return;

    if (selectedItems.length === 0) {
      setSavedCalculationResponse(undefined);
    }

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

  if (isChange && selectedItems?.length > 0 && !savedCalculationResponse) {
    return <Loading />;
  }

  return (
    <>
      {showSearchAndSelectItems && (
        <SearchAndSelectItems
          onClose={() => setShowSearchAndSelectItems(false)}
          addItem={add}
          addStatus={calculationStatus}
        />
      )}

      <PageStructure
        title={
          isChange
            ? t("CHANGE_AUTOSHIP_ITEMS__TITLE")
            : t("CREATE_AN_AUTOSHIP__STEPS.WHAT.PRIMARY_TEXT")
        }
        link={{
          value: t("COMMON__CANCEL"),
          onClick: () => {
            if (isChange) {
              setData(undefined);
            }

            router.back();
          },
          status: status ? "inactive" : "active",
        }}
        helperText={
          items === undefined
            ? t("CREATE_AN_AUTOSHIP__NO_ITEMS_ADDED")
            : undefined
        }
        button={{
          value: isChange ? t("COMMON__CHANGE") : t("COMMON__SAVE"),
          onClick: () => {
            if (isChange) {
              trigger({
                items: selectedItems.map((item) => {
                  return {
                    id: item.itemId,
                    variant_id: item.variantId,
                    quantity: item.quantity,
                  };
                }),
              });

              return;
            }

            setData({
              ...data,
              itemsCalculation: savedCalculationResponse,
              selectedItems: selectedItems,
            });

            router.back();
          },
          status: status ?? (isSaveButtonActive ? "active" : "inactive"),
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
          detailsTranslationValue={t("CREATE_AN_AUTOSHIP__ITEMS_CALCULATION")}
          totalTranslationValue={t(
            "CREATE_AN_AUTOSHIP__ITEMS_CALCULATION_TOTAL_AMOUNT"
          )}
          amount={savedCalculationResponse?.amount}
          currency={savedCalculationResponse?.currency}
          isAmountLoading={calculationResponse?.status === "loading"}
        />
      </PageStructure>
    </>
  );
};

export default Items;
