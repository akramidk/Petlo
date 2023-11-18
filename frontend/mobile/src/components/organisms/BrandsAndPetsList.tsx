import { View } from "react-native";
import { BrandsListProps, PetsListProps } from "../../interfaces";
import BrandsList from "./BrandsList";
import PetsList from "./PetsList";

interface BrandsAndPetsList {
  brandsList: BrandsListProps;
  petsList: PetsListProps;
}

const BrandsAndPetsList = ({ brandsList, petsList }: BrandsAndPetsList) => {
  return (
    <View>
      <BrandsList {...brandsList} />
      <View className="mb-[36px]" />
      <PetsList {...petsList} />
    </View>
  );
};

export default BrandsAndPetsList;
