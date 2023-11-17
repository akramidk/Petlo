import { useRouter } from "expo-router";
import { View } from "react-native";
import {
  BrandsAndPetsList,
  PageStructure,
  PetsList,
} from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";
import { CopyPhoneNumberButton } from "../_CopyPhoneNumberButton";

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
          onBrandClick: (public_id) => router.push(`/brands/${public_id}`),
        }}
      />
    </PageStructure>
  );
};

export default Shop;
