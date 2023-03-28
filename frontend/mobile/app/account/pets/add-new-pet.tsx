import { useRouter } from "expo-router";
import { useState } from "react";
import { Filed } from "../../../src/components/atoms";
import { PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";

const AddNewPet = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [name, setName] = useState("");

  return (
    <PageStructure title={t("ADD_NEW_PET__TITLE")} backButton={router.back}>
      <Filed
        name={t("ADD_NEW_PET__PET_NAME_LABEL")}
        placeholder={t("ADD_NEW_PET__PET_NAME_PLACEHOLDER")}
        onChange={setName}
        value={name}
        cn="mb-[16px]"
        require
      />
    </PageStructure>
  );
};

export default AddNewPet;
