import { useRouter, useSearchParams } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { useAPIMutation, useTranslationsContext } from "../../src/hooks";
import { Filed } from "../../src/components/atoms";
import { useState } from "react";
import { Endpoints } from "../../src/enums";
import {
  ChangeAutoshipNameRequest,
  ChangeAutoshipNameResponse,
} from "../../src/interfaces";

const ChangeName = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { publicId } = useSearchParams();

  const [name, setName] = useState("");
  const { trigger, status } = useAPIMutation<
    ChangeAutoshipNameRequest,
    ChangeAutoshipNameResponse
  >({
    endpoint: Endpoints.CHANGE_AUTOSHIP_NAME,
    method: "PATCH",
    options: {
      onSucceeded: router.back,
      fireOnSucceededAfter: 1000,
    },
    slugs: {
      publicId: publicId,
    },
  });

  return (
    <PageStructure
      title="Change Autoship Name"
      button={{
        value: t("COMMON__CHANGE"),
        onClick: () => trigger({ name: name }),
        status: status ?? (name.trim().length > 0 ? "active" : "inactive"),
      }}
      link={{
        value: t("COMMON__CANCEL"),
        onClick: router.back,
        status: status ? "inactive" : "active",
      }}
    >
      <Filed
        placeholder={t("CHANGE_NAME__FILED_PLACEHOLDER")}
        onChange={setName}
        value={name}
      />
    </PageStructure>
  );
};

export default ChangeName;
