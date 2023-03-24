import { useRouter } from "expo-router";
import { DataCard } from "../../../src/components/molecules";
import { PageStructure } from "../../../src/components/organisms";

const Informations = () => {
  const router = useRouter();

  return (
    <PageStructure
      title="Informations"
      backButton={router.back}
      button={{
        value: "dddf",
        onClick: () => {},
      }}
    >
      <DataCard
        primaryText="Name"
        secondaryText="Akram Khalil"
        actions={[
          {
            name: "Change",
            onClick: () => console.log("hello"),
          },
        ]}
      />
    </PageStructure>
  );
};

export default Informations;
