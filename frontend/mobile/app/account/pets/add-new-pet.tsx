import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Filed, Selector } from "../../../src/components/atoms";
import { PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import { useAPIFetching, useTranslationsContext } from "../../../src/hooks";
import { BaseOption, PetsInformationResponse } from "../../../src/interfaces";
import Loading from "../../_Loading";

const AddNewPet = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { response } = useAPIFetching<undefined, PetsInformationResponse>({
    endpoint: Endpoints.PETS_INFORMATION,
  });

  const [name, setName] = useState("");
  const [pet, setPet] = useState<BaseOption>();

  const pets: BaseOption[] = useMemo(() => {
    if (response.isFetching) return;

    return response.body.data.map((pet) => {
      return {
        id: pet.key,
        value: pet.value,
      };
    });
  }, [response]);

  if (response.isFetching) {
    return <Loading />;
  }

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

      <Selector
        cn="mb-[16px]"
        name={t("ADD_NEW_PET__PET_TYPE_LABEL")}
        placeholder={t("ADD_NEW_PET__PET_TYPE_PLACEHOLDER")}
        options={pets}
        signalSelect={{
          selectedOption: pet,
          setSelectedOption: setPet,
        }}
        require
      />
    </PageStructure>
  );
};

export default AddNewPet;
