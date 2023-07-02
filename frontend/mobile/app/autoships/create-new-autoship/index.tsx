import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Filed } from "../../../src/components/atoms";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { useDataContext, useTranslationsContext } from "../../../src/hooks";
import {
  DataCardProps,
  Address,
  Payment,
  Pet,
  RecurringInterval,
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

  const cards: DataCardProps[] = useMemo(() => {
    const selectText = t("COMMON__SELECT");
    const changeText = t("COMMON__CHANGE");

    return [
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHAT.PRIMARY_TEXT"),
        secondaryText: t(
          "CREATE_AN_AUTOSHIP__STEPS.WHAT.SECONDARY_TEXT.WITHOUT_DATA"
        ),
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

  useEffect(() => {
    if (name) setData({ ...data, name });
  }, [name]);

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__TITLE")}
      button={{
        value: t("COMMON__CREATE"),
        onClick: () => {},
        status: "inactive",
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
