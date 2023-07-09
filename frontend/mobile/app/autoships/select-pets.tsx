import { PageStructure } from "../../src/components/organisms";
import { Link, OptionsWithLabel, Text } from "../../src/components/atoms";
import { useRouter } from "expo-router";
import {
  useAPIFetching,
  useDataContext,
  useTranslationsContext,
} from "../../src/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  BaseOption,
  CustomerPetsRequest,
  CustomerPetsResponse,
  Pet,
} from "../../src/interfaces";
import { Endpoints } from "../../src/enums";
import { DataCard } from "../../src/components/molecules";
import { Loading } from "../../src/components/pages";
import { buttonStatus } from "../../src/types";

const SelectPets = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();

  const [pets, setPets] = useState<BaseOption[]>();

  const { response: petsResponse } = useAPIFetching<
    CustomerPetsRequest,
    CustomerPetsResponse
  >({
    endpoint: Endpoints.CUSTOMER_PETS,
    options: {
      withPagination: true,
    },
  });

  const customerPets = useMemo(() => {
    return petsResponse.body?.data?.map((pet) => {
      return {
        id: pet.public_id,
        value: (
          <DataCard
            primaryText={pet.name}
            secondaryText={`${pet.breed} ${pet.gender}`}
            withoutContainerStyles
          />
        ) as React.ReactNode,
      };
    });
  }, [petsResponse]);

  const buttonStatus: buttonStatus = useMemo(() => {
    const savedPets = (data?.pets as Pet[]) ?? [];
    let newPets = pets ?? [];

    const isSavedPetsStillExist = savedPets.every((savedPet) => {
      const newPet = newPets.find((pet) => pet.id === savedPet.public_id);

      if (newPet) {
        newPets = newPets.filter((pet) => pet.id !== newPet.id);
      }

      return newPet;
    });

    if (isSavedPetsStillExist && newPets.length === 0) return "inactive";
    return "active";
  }, [pets, data?.pets]);

  useEffect(() => {
    const savedPets = data?.pets as Pet[];
    if (customerPets === undefined || savedPets === undefined) return;

    setPets(
      savedPets.map((savedPet) =>
        customerPets.find((pet) => pet.id === savedPet.public_id)
      )
    );
  }, []);

  if (petsResponse === undefined || petsResponse.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__STEPS.WHOM.PRIMARY_TEXT")}
      button={{
        value: t("COMMON__SAVE"),
        onClick: () => {
          setData({
            ...data,
            pets:
              pets && pets.length > 0
                ? pets.map((pet) => {
                    return petsResponse.body.data.find(
                      (customerPet) => customerPet.public_id === pet.id
                    );
                  })
                : undefined,
          });

          router.back();
        },
        status: buttonStatus,
      }}
      link={{ value: t("COMMON__CANCEL"), onClick: router.back }}
    >
      <OptionsWithLabel
        cn="mb-[12px]"
        options={{
          optionValueCn: "text-[#666]",
          optionValueFont: "semiBold",
          options: customerPets,
          multipleSelect: {
            selectedOptions: pets,
            setSelectedOptions: setPets,
          },
        }}
      />

      <Link
        valueCN="text-[#9747FF] text-[14px]"
        value={t("CREATE_AN_AUTOSHIP__ADD_NEW_PET_TO_USE")}
        onClick={() => router.push("/account/pets/add-new-pet")}
      />
    </PageStructure>
  );
};

export default SelectPets;
