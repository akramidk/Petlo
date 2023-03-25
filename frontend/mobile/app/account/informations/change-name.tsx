import { useRouter } from "expo-router";
import { useState } from "react";
import { PageStructure } from "../../../src/components/organisms";
import { useAPIMutation, useTranslationsContext } from "../../../src/hooks";
import { Filed } from "../../../src/components/atoms";
import { Endpoints } from "../../../src/enums";
import {
  ChangeCustomerNameRequest,
  ChangeCustomerNameResponse,
} from "../../../src/interfaces";

const ChangeName = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [name, setName] = useState("");
  const { trigger, status } = useAPIMutation<
    ChangeCustomerNameRequest,
    ChangeCustomerNameResponse
  >({
    endpoint: Endpoints.CHANGE_CUSTOMER_NAME,
    method: "PATCH",
    options: {
      onSucceeded: router.back,
      fireOnSucceededAfter: 1000,
    },
  });

  return (
    <PageStructure
      title={t("CHANGE_NAME__TITLE")}
      button={{
        value: t("CHANGE_NAME__CHANGE_BUTTON"),
        onClick: () =>
          trigger({
            name: name,
          }),
        status: status ?? (name.trim().length !== 0 ? "active" : "inactive"),
      }}
      link={{
        value: t("CHANGE_NAME__CANCEL_BUTTON"),
        onClick: router.back,
        status: status ? "inactive" : "active",
      }}
    >
      <Filed
        cn="mb-[16px]"
        placeholder={t("CHANGE_NAME__FILED_PLACEHOLDER")}
        onChange={setName}
        value={name}
      />
    </PageStructure>
  );
};

export default ChangeName;
