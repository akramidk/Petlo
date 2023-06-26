import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Filed } from "../../../src/components/atoms";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { DataCardProps } from "../../../src/interfaces";

const CreateNewAutoship = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const cards: DataCardProps[] = useMemo(() => {
    return [
      {
        primaryText: "Items",
        secondaryText: "Select items",
      },
      {
        primaryText: "Delivery Address",
        secondaryText: "Select items",
      },
      {
        primaryText: "Payment Method",
        secondaryText: "Select items",
      },
      {
        primaryText: "Shipping Date",
        secondaryText: "Select items",
      },
    ];
  }, []);

  return (
    <PageStructure
      title="Create an Autoship"
      button={{
        value: "Create",
        onClick: () => {},
        status: "inactive",
      }}
      link={{
        value: "Cancel",
        onClick: router.back,
      }}
    >
      <Filed
        name="Autoship Name"
        require={true}
        placeholder="enter a name like My Cat Autoship"
        onChange={setName}
        value={name}
        cn="mb-[12px]"
      />

      <DataCards data={cards} cn="space-y-[12px]" />
    </PageStructure>
  );
};

export default CreateNewAutoship;
