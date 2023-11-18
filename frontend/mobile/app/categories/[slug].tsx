import { useLocalSearchParams, useRouter } from "expo-router";
import { CategoryPage } from "../../src/components/pages";

const Category = () => {
  const router = useRouter();
  const { slug, name } = useLocalSearchParams();

  return <CategoryPage publicId={slug} name={name} backButton={router.back} />;
};

export default Category;
