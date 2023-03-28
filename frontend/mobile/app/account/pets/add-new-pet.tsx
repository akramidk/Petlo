import { useRouter } from "expo-router";
import { useState } from "react";
import { Filed } from "../../../src/components/atoms";
import { PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import { useAPIFetching, useTranslationsContext } from "../../../src/hooks";
import { PetsInformationResponse } from "../../../src/interfaces";
import Loading from "../../_Loading";

const AddNewPet = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { response } = useAPIFetching<undefined, PetsInformationResponse>({
    endpoint: Endpoints.PETS_INFORMATION,
  });

  const [name, setName] = useState("");

  if (response.isFetching) {
    return <Loading />;
  }

  console.log("response", response.body);

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
