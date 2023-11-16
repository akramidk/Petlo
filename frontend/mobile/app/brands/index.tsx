import { BrandsList, PageStructure } from "../../src/components/organisms";
import { useRouter } from "expo-router";

const Brands = () => {
  const router = useRouter();

  return (
    <PageStructure
      title="Brands"
      backButton={router.back}
      scrollEnabled={false}
    >
      <BrandsList limit={12} />
    </PageStructure>
  );
};

export default Brands;
