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
      <BrandsList
        limit={12}
        onBrandClick={(public_id) => router.push(`/brands/${public_id}`)}
      />
    </PageStructure>
  );
};

export default Brands;
