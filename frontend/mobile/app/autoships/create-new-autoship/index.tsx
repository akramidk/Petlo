import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Filed } from "../../../src/components/atoms";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import { DataCardProps } from "../../../src/interfaces";

const CreateNewAutoship = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const [name, setName] = useState("");

  const cards: DataCardProps[] = useMemo(() => {
    return [
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHAT.PRIMARY_TEXT"),
        secondaryText: "Select items",
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHERE.PRIMARY_TEXT"),
        secondaryText: "Select items",
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.HOW.PRIMARY_TEXT"),
        secondaryText: "Select items",
      },
      {
        primaryText: t("CREATE_AN_AUTOSHIP__STEPS.WHEN.PRIMARY_TEXT"),
        secondaryText: "Select items",
      },
    ];
  }, []);

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
