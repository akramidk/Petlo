import { View } from "react-native";
import { useTranslationsContext } from "../../hooks";
import { BrandsListProps } from "../../interfaces";
import BrandsList from "./BrandsList";
import PetsList from "./PetsList";

interface BrandsAndPetsList {
  brandsList: BrandsListProps;
}

const BrandsAndPetsList = ({ brandsList }: BrandsAndPetsList) => {
  const { t } = useTranslationsContext();

  return (
    <View>
      <BrandsList {...brandsList} />
      <View className="mb-[36px]" />
      <PetsList title={t("BRANDS_AND_PETS_LIST__SHOP_BY_PET")} />
    </View>
  );
};

export default BrandsAndPetsList;
