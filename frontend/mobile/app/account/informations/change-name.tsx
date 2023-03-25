import { useRouter } from "expo-router";
import { useState } from "react";
import { PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import { Filed } from "../../../src/components/atoms";

const ChangeName = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [name, setName] = useState("");

  return (
    <PageStructure
      title={t("CHANGE_NAME__TITLE")}
      button={{
        value: t("CHANGE_NAME__CHANGE_BUTTON"),
        onClick: () => {},
        status: name.trim().length !== 0 ? "active" : "inactive",
      }}
      link={{
        value: t("CHANGE_NAME__CANCEL_BUTTON"),
        onClick: router.back,
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
