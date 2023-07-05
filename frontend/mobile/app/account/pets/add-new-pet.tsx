import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Filed, Selector } from "../../../src/components/atoms";
import { PageStructure } from "../../../src/components/organisms";
import { PETS_GENDERS } from "../../../src/constants";
import { Endpoints } from "../../../src/enums";
import {
  useAPIFetching,
  useAPIMutation,
  useTranslationsContext,
} from "../../../src/hooks";
import {
  AddNewPetRequest,
  AddNewPetResponse,
  BaseOption,
  PetsInformationResponse,
} from "../../../src/interfaces";
import Loading from "../../../src/components/pages/Loading";

const AddNewPet = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { response } = useAPIFetching<undefined, PetsInformationResponse>({
    endpoint: Endpoints.PETS_INFORMATION,
  });
  const { trigger, status } = useAPIMutation<
    AddNewPetRequest,
    AddNewPetResponse
  >({
    endpoint: Endpoints.ADD_NEW_PET,
    method: "POST",
    options: {
      onSucceeded: router.back,
      fireOnSucceededAfter: 1000,
    },
  });

  const [name, setName] = useState("");
  const [type, setType] = useState<BaseOption>();
  const [breed, setBreed] = useState<BaseOption>();
  const [gender, setGender] = useState<BaseOption>();

  const types: BaseOption[] = useMemo(() => {
    if (response.isFetching) return;

    return response.body.data.map((pet) => {
      return {
        id: pet.key,
        value: pet.value,
      };
    });
  }, [response]);

  const breeds: BaseOption[] = useMemo(() => {
    if (type === undefined) return [];

    return response.body.data
      .find((t) => t.key === type.id)
      .breeds.map((breed) => {
        return {
          id: breed.key,
          value: breed.value,
        };
      });
  }, [type]);

  const buttonSattus = useMemo(() => {
    if (status) return status;

    return name.length === 0 || !type || !breed || !gender
      ? "inactive"
      : "active";
  }, [status, name, type, breed, gender]);

  if (response.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("ADD_NEW_PET__TITLE")}
      button={{
        value: t("ADD_NEW_PET__ADD_BUTTON"),
        onClick: () =>
          trigger({
            name: name,
            kind: type.id as string,
            breed: breed.id as string,
            gender: gender.id as string,
          }),
        status: buttonSattus,
      }}
      link={{
        value: t("ADD_NEW_PET__CANCEL_BUTTON"),
        onClick: router.back,
        status: status ? "inactive" : "active",
      }}
    >
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
        options={types}
        signalSelect={{
          selectedOption: type,
          setSelectedOption: setType,
        }}
        require
      />

      {
        // TODO should be disabled if pet not selected
      }
      {type && (
        <Selector
          cn="mb-[16px]"
          name={t("ADD_NEW_PET__PET_BREED_LABEL")}
          placeholder={t("ADD_NEW_PET__PET_BREED_PLACEHOLDER")}
          options={breeds}
          signalSelect={{
            selectedOption: breed,
            setSelectedOption: setBreed,
          }}
          require
        />
      )}

      <Selector
        cn="mb-[16px]"
        name={t("ADD_NEW_PET__PET_GENDER_LABEL")}
        placeholder={t("ADD_NEW_PET__PET_GENDER_PLACEHOLDER")}
        options={PETS_GENDERS}
        signalSelect={{
          selectedOption: gender,
          setSelectedOption: setGender,
        }}
        require
        translate
      />
    </PageStructure>
  );
};

export default AddNewPet;
