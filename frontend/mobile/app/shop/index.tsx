import { useRouter } from "expo-router";
import {
  BrandsAndPetsList,
  PageStructure,
  PetsList,
} from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";

const Shop = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <PageStructure title={t("SHOP__TITLE")} backButton={router.back}>
      <BrandsAndPetsList
        brandsList={{
          limit: 6,
          fetchMore: false,
          title: t("BRANDS_AND_PETS_LIST__SHOP_BY_BRAND"),
          showAllButton: true,
          onShowAllButtonClick: () => router.push("/brands"),
          onBrandClick: (brand) =>
            router.push(`/brands/${brand.public_id}?name=${brand.name}`),
        }}
        petsList={{
          title: t("BRANDS_AND_PETS_LIST__SHOP_BY_PET"),
          onPetClick: (pet) =>
            router.push(`/categories/${pet.public_id}?name=${pet.name}`),
        }}
      />
    </PageStructure>
  );
};

export default Shop;
