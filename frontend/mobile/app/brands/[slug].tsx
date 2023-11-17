import { useLocalSearchParams, useRouter } from "expo-router";
import { BrandPage } from "../../src/components/pages";

const Brand = () => {
  const router = useRouter();
  const { slug, name } = useLocalSearchParams();

  return <BrandPage publicId={slug} name={name} backButton={router.back} />;
};

export default Brand;
