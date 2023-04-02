import { useRouter, useSearchParams } from "expo-router";
import { PageStructure } from "../../src/components/organisms";

const Category = () => {
  const router = useRouter();
  const { name } = useSearchParams();

  return <PageStructure title={name} backButton={router.back} />;
};

export default Category;
