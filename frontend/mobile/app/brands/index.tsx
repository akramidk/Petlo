import { BrandsList, PageStructure } from "../../src/components/organisms";
import { useRouter } from "expo-router";
import { BrandsPage } from "../../src/components/pages";

const Brands = () => {
  const router = useRouter();

  return (
    <BrandsPage
      backButton={router.back}
      onBrandClick={(brand) =>
        router.push(`/brands/${brand.public_id}?name=${brand.name}`)
      }
    />
  );
};

export default Brands;
