import { useRouter } from "expo-router";
import { PageStructure } from "../../../src/components/organisms";

const Pets = () => {
  const router = useRouter();

  return (
    <PageStructure
      title="Pets"
      button={{
        value: "Add New Pet",
        onClick: () => router.push("/account/pets/add-new-pet"),
      }}
      backButton={router.back}
    />
  );
};

export default Pets;
