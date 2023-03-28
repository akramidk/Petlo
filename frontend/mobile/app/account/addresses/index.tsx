import { useRouter } from "expo-router";
import { PageStructure } from "../../../src/components/organisms";

const Addresses = () => {
  const router = useRouter();

  return (
    <PageStructure
      title="Your Addresses"
      button={{
        value: "Add New",
        onClick: () => router.push("/account/addresses/add-new-address"),
      }}
      backButton={router.back}
    />
  );
};

export default Addresses;
