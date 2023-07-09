import { useRouter } from "expo-router";
import { View } from "react-native";
import { Text } from "../../src/components/atoms";
import { PageStructure } from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";
import { Filed } from "../../src/components/atoms";
import { useState } from "react";

const ChangeName = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [name, setName] = useState("");

  return (
    <PageStructure
      title="Change Autoship Name"
      button={{
        value: t("COMMON__CHANGE"),
        onClick: () => {},
        status: name.trim().length > 0 ? "active" : "inactive",
      }}
      link={{
        value: t("COMMON__CANCEL"),
        onClick: router.back,
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
