import { Address } from "@stripe/stripe-react-native";
import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Filed } from "../../../src/components/atoms";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import { DataCardProps } from "../../../src/interfaces";

const CreateNewAutoship = () => {
  const router = useRouter();
  const { data } = useSearchParams();
  const { t } = useTranslationsContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState<Address>();

  const cards: DataCardProps[] = useMemo(() => {
    return [
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHAT.PRIMARY_TEXT"),
        secondaryText: t(
          "CREATE_AN_AUTOSHIP__STEPS.WHAT.SECONDARY_TEXT.WITHOUT_DATA"
        ),
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHERE.PRIMARY_TEXT"),
        secondaryText: t(
          "CREATE_AN_AUTOSHIP__STEPS.WHERE.SECONDARY_TEXT.WITHOUT_DATA"
        ),
        actions: [
          {
            name: "Select",
            onClick: () =>
              router.push("/autoships/create-new-autoship/select-address"),
          },
        ],
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.HOW.PRIMARY_TEXT"),
        secondaryText: t(
          "CREATE_AN_AUTOSHIP__STEPS.HOW.SECONDARY_TEXT.WITHOUT_DATA"
        ),
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHEN.PRIMARY_TEXT"),
        secondaryText: t(
          "CREATE_AN_AUTOSHIP__STEPS.WHEN.SECONDARY_TEXT.WITHOUT_DATA"
        ),
      },
    ];
  }, []);

  useEffect(() => {
    const _data = JSON.parse(data ?? "{}");

    if (_data["name"]) {
      setName(_data["name"]);
    }

    console.log("_data", _data);
  }, []);

  useEffect(() => {
    const data = {};

    if (name) {
      data["name"] = name;
    }

    if (address) {
      data["address"] = address;
    }

    router.setParams({ data: JSON.stringify(data) });
  }, [name, address]);

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
        onClick: router.back,
      }}
    >
      <Filed
        name="Autoship Name"
        require={true}
        placeholder="enter a name like My Cat Autoship"
        onChange={setName}
        value={name}
        cn="mb-[12px]"
      />

      <DataCards data={cards} cn="space-y-[12px]" />
    </PageStructure>
  );
};

export default CreateNewAutoship;
