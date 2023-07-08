import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Filed } from "../../../src/components/atoms";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import {
  useAPIMutation,
  useDataContext,
  useTranslationsContext,
} from "../../../src/hooks";
import {
  DataCardProps,
  Address,
  Payment,
  Pet,
  RecurringInterval,
  CalculateAutoshipItemsAmountResponse,
  CreateAnAutoshipRequest,
  CreateAnAutoshipResponse,
} from "../../../src/interfaces";
import NextShipment from "./interfaces/NextShipment";

const CreateNewAutoship = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();

  const [name, setName] = useState(data?.name ?? "");
  const address: Address = data?.address;
  const payment: Payment = data?.payment;
  const pets: Pet[] = data?.pets;
  const nextShipment: NextShipment = data?.nextShipment;
  const recurringInterval: RecurringInterval = data?.recurringInterval;
  const recurringIntervalCount: number = data?.recurringIntervalCount;
  const itemsCalculation: CalculateAutoshipItemsAmountResponse =
    data?.itemsCalculation;
  const selectedItems: {
    itemId: string;
    variantId: string;
    quantity: number;
  }[] = data?.selectedItems;

  const cards: DataCardProps[] = useMemo(() => {
    const selectText = t("COMMON__SELECT");
    const changeText = t("COMMON__CHANGE");

    const numberofTotalItem = itemsCalculation
      ? itemsCalculation.items.reduce((accumulator, item) => {
          let number = 0;

          item.variants.forEach((variant) => {
            number += variant.quantity;
          });

          return accumulator + number;
        }, 0)
      : undefined;

    return [
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHAT.PRIMARY_TEXT"),
        secondaryText: itemsCalculation
          ? numberofTotalItem
          : t("CREATE_AN_AUTOSHIP__STEPS.WHAT.SECONDARY_TEXT.WITHOUT_DATA"),
        actions: [
          {
            name: address ? changeText : selectText,
            onClick: () =>
              router.push("/autoships/create-new-autoship/select-items"),
          },
        ],
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHERE.PRIMARY_TEXT"),
        secondaryText: address
          ? t("CREATE_AN_AUTOSHIP__STEPS.WHERE.SECONDARY_TEXT.WITH_DATA", {
              addressName: address.name,
            })
          : t("CREATE_AN_AUTOSHIP__STEPS.WHERE.SECONDARY_TEXT.WITHOUT_DATA"),
        actions: [
          {
            name: address ? changeText : selectText,
            onClick: () =>
              router.push("/autoships/create-new-autoship/select-address"),
          },
        ],
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.HOW.PRIMARY_TEXT"),
        secondaryText: payment
          ? t(
              `CREATE_AN_AUTOSHIP__STEPS.HOW.SECONDARY_TEXT.WITH_DATA.${payment.method.toUpperCase()}`,
              {
                last4: payment?.card?.last4,
              }
            )
          : t("CREATE_AN_AUTOSHIP__STEPS.HOW.SECONDARY_TEXT.WITHOUT_DATA"),
        actions: [
          {
            name: payment ? changeText : selectText,
            onClick: () =>
              router.push("/autoships/create-new-autoship/select-payment"),
          },
        ],
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHOM.PRIMARY_TEXT"),
        secondaryText: pets
          ? pets.map((pet) => pet.name).join(", ")
          : t("CREATE_AN_AUTOSHIP__STEPS.WHOM.SECONDARY_TEXT.WITHOUT_DATA"),
        actions: [
          {
            name: pets ? changeText : selectText,
            onClick: () =>
              router.push("/autoships/create-new-autoship/select-pets"),
          },
        ],
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHEN.PRIMARY_TEXT"),
        secondaryText: nextShipment
          ? t("CREATE_AN_AUTOSHIP__STEPS.WHEN.SECONDARY_TEXT.WITH_DATA", {
              firstShipmentDate: `${nextShipment.day}/${nextShipment.month}/${nextShipment.year}`,
              thenEvery: `${recurringIntervalCount} ${t(
                recurringInterval.value
              )}`,
            })
          : t("CREATE_AN_AUTOSHIP__STEPS.WHEN.SECONDARY_TEXT.WITHOUT_DATA"),
        actions: [
          {
            name: nextShipment ? changeText : selectText,
            onClick: () =>
              router.push("/autoships/create-new-autoship/select-date"),
          },
        ],
      },
    ];
  }, [address, payment, pets]);

  const isCreateButtonActive =
    name.trim().length > 0 &&
    address &&
    payment &&
    nextShipment &&
    recurringInterval &&
    recurringIntervalCount &&
    itemsCalculation;

  const { response, trigger, status } = useAPIMutation<
    CreateAnAutoshipRequest,
    CreateAnAutoshipResponse
  >({
    endpoint: Endpoints.CREATE_AN_AUTOSHIP,
    method: "POST",
    options: {
      onSucceeded: () => {
        //
      },
      resetSucceededStatusAfter: 2000,
    },
  });

  const createHandler = useCallback(() => {
    const items = selectedItems.map((item) => {
      return {
        id: item.itemId,
        variant_id: item.variantId,
        quantity: item.quantity,
      };
    });

    const nextShipmentOn = `${nextShipment.year}-${nextShipment.month}-${nextShipment.day}`;

    const cardObj =
      payment.method === "card"
        ? {
            card: {
              id: payment.card.public_id as string,
            },
          }
        : {};

    trigger({
      name,
      next_shipment_on: nextShipmentOn,
      recurring_interval: recurringInterval.id,
      recurring_interval_count: recurringIntervalCount,
      address_id: address.public_id,
      items: items,
      payment: {
        method: "cash",
        ...cardObj,
      },
      pets: pets ? pets.map((pet) => pet.public_id) : undefined,
    });
  }, [
    name,
    nextShipment,
    recurringInterval,
    recurringIntervalCount,
    address,
    selectedItems,
    payment,
    pets,
  ]);

  useEffect(() => {
    if (name) setData({ ...data, name });
  }, [name]);

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__TITLE")}
      button={{
        value: t("COMMON__CREATE"),
        onClick: createHandler,
        status: status ?? (isCreateButtonActive ? "active" : "inactive"),
      }}
      link={{
        value: t("COMMON__CANCEL"),
        onClick: () => {
          setData(undefined);
          router.back();
        },
      }}
    >
      <Filed
        name={t("CREATE_AN_AUTOSHIP__NAME_FILED_LABEL")}
        placeholder={t("CREATE_AN_AUTOSHIP__NAME_FILED_PLACEHOLDER")}
        require={true}
        onChange={setName}
        value={name}
        cn="mb-[8px]"
      />

      <DataCards data={cards} cn="space-y-[8px]" />
    </PageStructure>
  );
};

export default CreateNewAutoship;
