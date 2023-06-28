import { PageStructure } from "../../../src/components/organisms";
import { Link, OptionsWithLabel, Text } from "../../../src/components/atoms";
import { useRouter } from "expo-router";
import { useAPIFetching, useTranslationsContext } from "../../../src/hooks";
import { useMemo, useState } from "react";
import {
  BaseOption,
  CustomerPetsRequest,
  CustomerPetsResponse,
} from "../../../src/interfaces";
import { Endpoints } from "../../../src/enums";
import { DataCard } from "../../../src/components/molecules";
import Loading from "../../_Loading";

const SelectPets = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

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

  if (petsResponse === undefined || petsResponse.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title="Pets"
      button={{
        value: "Select",
        onClick: () => {
          router.back();
        },
        status: "inactive",
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
