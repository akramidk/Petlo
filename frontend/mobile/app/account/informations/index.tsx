import { useRouter } from "expo-router";
import { Text, TextInputComponent, View } from "react-native";
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
      <Text>jjjj</Text>
    </PageStructure>
  );
};

export default Informations;
