import { PageStructure } from "../../src/components/organisms";
import { Link, OptionsWithLabel, Text } from "../../src/components/atoms";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  useAPIFetching,
  useAPIMutation,
  useDataContext,
  useTranslationsContext,
} from "../../src/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  BaseOption,
  ChangeAutoshipAddressRequest,
  ChangeAutoshipAddressResponse,
  ChangeAutoshipPetsRequest,
  ChangeAutoshipPetsResponse,
  CustomerPetsRequest,
  CustomerPetsResponse,
  Pet,
} from "../../src/interfaces";
import { Endpoints } from "../../src/enums";
import { DataCard } from "../../src/components/molecules";
import { Loading } from "../../src/components/pages";
import { buttonStatus } from "../../src/types";

const Pets = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();
  const { type, publicId } = useLocalSearchParams<{
    type: string;
    publicId: string;
  }>();

  const isChange = type === "change";

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
  }, [customerPets, data]);

  const { trigger, status } = useAPIMutation<
    ChangeAutoshipPetsRequest,
    ChangeAutoshipPetsResponse
  >({
    endpoint: Endpoints.CHANGE_AUTOSHIP_PETS,
    method: "PATCH",
    options: {
      onSucceeded: () => {
        setData(undefined);
        router.back();
      },
      fireOnSucceededAfter: 1000,
    },
    slugs: {
      publicId: publicId,
    },
  });

  if (petsResponse === undefined || petsResponse.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={
        isChange
          ? t("CHANGE_AUTOSHIP_PETS__TITLE")
          : t("CREATE_AN_AUTOSHIP__STEPS.WHOM.PRIMARY_TEXT")
      }
      button={{
        value: isChange ? t("COMMON__CHANGE") : t("COMMON__SAVE"),
        onClick: () => {
          if (isChange) {
            trigger({ pets: pets.map((pet) => pet.id as string) });
            return;
          }

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
        status: status ?? buttonStatus,
      }}
      link={{
        value: t("COMMON__CANCEL"),
        onClick: () => {
          if (isChange) {
            setData(undefined);
          }

          router.back();
        },
        status: status ? "inactive" : "active",
      }}
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
        value={`+ ${t("CREATE_AN_AUTOSHIP__ADD_NEW_PET_TO_USE")}`}
        onClick={() => router.push("/account/pets/add-new-pet")}
      />
    </PageStructure>
  );
};

export default Pets;
