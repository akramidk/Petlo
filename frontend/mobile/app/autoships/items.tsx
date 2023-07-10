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

  const isSaveButtonActive = useMemo(() => {
    return true;
  }, [savedCalculationResponse]);

  const { trigger, status } = useAPIMutation<any, any>({
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

  if (selectedItems?.length > 0 && !savedCalculationResponse) {
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
            setData({
              ...data,
              itemsCalculation: savedCalculationResponse,
              selectedItems: selectedItems,
            });

            router.back();
          },
          status: isSaveButtonActive ? "active" : "inactive",
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
