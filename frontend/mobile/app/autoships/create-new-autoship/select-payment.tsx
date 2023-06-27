import { useRouter } from "expo-router";
import { useState } from "react";
import { PageStructure } from "../../../src/components/organisms";
import { useDataContext, useTranslationsContext } from "../../../src/hooks";
import { BaseOption } from "../../../src/interfaces";

const SelectPayment = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();

  const [payment, setPayment] = useState<BaseOption>();

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__STEPS.HOW.PRIMARY_TEXT")}
      button={{
        value: "Select",
        onClick: () => {
          setData({
            ...data,
          });

          router.back();
        },
        status:
          payment === undefined || payment?.id === data?.payment?.public_id
            ? "inactive"
            : "active",
      }}
      link={{ value: "Cancel", onClick: router.back }}
    ></PageStructure>
  );
};

export default SelectPayment;
