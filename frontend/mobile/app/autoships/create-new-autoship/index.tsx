import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Filed } from "../../../src/components/atoms";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { useDataContext, useTranslationsContext } from "../../../src/hooks";
import { DataCardProps, Address, Payment, Pet } from "../../../src/interfaces";

const CreateNewAutoship = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();

  const [name, setName] = useState(data?.name ?? "");

  const cards: DataCardProps[] = useMemo(() => {
    const address: Address = data?.address;
    const payment: Payment = data?.payment;
    const pets: Pet[] = data?.pets;

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
            name: address ? "Change" : "Select",
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
            name: payment ? "Change" : "Select",
            onClick: () =>
              router.push("/autoships/create-new-autoship/select-payment"),
          },
        ],
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHOM.PRIMARY_TEXT"),
        secondaryText: t(
          "CREATE_AN_AUTOSHIP__STEPS.WHOM.SECONDARY_TEXT.WITHOUT_DATA"
        ),
        actions: [
          {
            name: pets ? "Change" : "Select",
            onClick: () =>
              router.push("/autoships/create-new-autoship/select-pets"),
          },
        ],
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHEN.PRIMARY_TEXT"),
        secondaryText: t(
          "CREATE_AN_AUTOSHIP__STEPS.WHEN.SECONDARY_TEXT.WITHOUT_DATA"
        ),
      },
    ];
  }, [data]);

  useEffect(() => {
    if (name) setData({ ...data, name });
  }, [name]);

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__TITLE")}
      button={{
        value: "Create",
        onClick: () => {},
        status: "inactive",
      }}
      link={{
        value: "Cancel",
        onClick: () => {
          setData(undefined);
          router.back();
        },
      }}
    >
      <Filed
        name="Autoship Name"
        require={true}
        placeholder="enter a name like My Cat Autoship"
        onChange={setName}
        value={name}
        cn="mb-[8px]"
      />

      <DataCards data={cards} cn="space-y-[8px]" />
    </PageStructure>
  );
};

export default CreateNewAutoship;
