import { useRouter } from "expo-router";
import { useState } from "react";
import { PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import { Item } from "../../../src/interfaces";

const SelectItems = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [items, setItems] = useState<Pick<Item, "public_id">>();

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__STEPS.WHAT.PRIMARY_TEXT")}
      link={{ value: t("COMMON__CANCEL"), onClick: router.back }}
    ></PageStructure>
  );
};

export default SelectItems;
