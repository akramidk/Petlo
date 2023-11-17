import { View } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { useLocalSearchParams, useRouter } from "expo-router";

const brand = () => {
  const router = useRouter();
  const { slug, name } = useLocalSearchParams();

  return <PageStructure title={name} backButton={router.back}></PageStructure>;
};

export default brand;
