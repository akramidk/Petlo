import { View } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { useLocalSearchParams, useRouter } from "expo-router";

const brand = () => {
  const router = useRouter();
  const { slug } = useLocalSearchParams();

  console.log(slug);

  return <PageStructure title={slug} backButton={router.back}></PageStructure>;
};

export default brand;
