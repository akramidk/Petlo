import { PageStructure } from "../../../src/components/organisms";
import { Link, OptionsWithLabel, Text } from "../../../src/components/atoms";
import { useRouter } from "expo-router";
import {
  useAPIFetching,
  useDataContext,
  useTranslationsContext,
} from "../../../src/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  BaseOption,
  CustomerPetsRequest,
  CustomerPetsResponse,
  Pet,
} from "../../../src/interfaces";
import { Endpoints } from "../../../src/enums";
import { DataCard } from "../../../src/components/molecules";
import Loading from "../../_Loading";
import { buttonStatus } from "../../../src/types";

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
    let savedPets = (data?.pets as Pet[]) ?? [];
    let newPets = pets ?? [];

    savedPets.every((savedPet) => {
      const newPet = newPets.find((pet) => pet.id === savedPet.public_id);

      if (newPet) {
        savedPets = savedPets.filter((pet) => pet.public_id !== newPet.id);
        newPets = newPets.filter((pet) => pet.id !== newPet.id);
      }

      return newPet;
    });

    console.log("savedPets", savedPets);
    console.log("newPets", newPets);

    if (savedPets.length === 0 && newPets.length === 0) return "inactive";
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
      title="Pets"
      button={{
        value: "Select",
        onClick: () => {
          setData({
            ...data,
            pets: pets.map((pet) => {
              return petsResponse.body.data.find(
                (customerPet) => customerPet.public_id === pet.id
              );
            }),
          });

          router.back();
        },
        status: buttonStatus,
      }}
      link={{ value: "Cancel", onClick: router.back }}
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
        value="+ Add New Pet To Use"
        onClick={() => router.push("/account/pets/add-new-pet")}
      />
    </PageStructure>
  );
};

export default SelectPets;
