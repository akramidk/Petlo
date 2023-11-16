import { View } from "react-native";
import { useTranslationsContext } from "../../hooks";
import BrandsList from "./BrandsList";
import PetsList from "./PetsList";

const BrandsAndPetsList = () => {
  const { t } = useTranslationsContext();

  return (
    <View>
      <BrandsList
        limit={6}
        fetchMore={false}
        title={t("BRANDS_AND_PETS_LIST__SHOP_BY_BRAND")}
        showAllButton
      />

      <View className="mb-[36px]" />

      <PetsList title={t("BRANDS_AND_PETS_LIST__SHOP_BY_PET")} />
    </View>
  );
};

export default BrandsAndPetsList;
