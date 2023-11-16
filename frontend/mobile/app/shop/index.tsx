import { useRouter } from "expo-router";
import { View } from "react-native";
import {
  BrandsList,
  PageStructure,
  PetsList,
} from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";
import { CopyPhoneNumberButton } from "../_CopyPhoneNumberButton";

const Shop = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <PageStructure title="Shop" backButton={router.back}>
      <BrandsList
        limit={6}
        fetchMore={false}
        title="Shop by Brand"
        showAllButton
      />
      <View className="mb-[28px]"></View>
      <PetsList title="Shop by Pet" />
    </PageStructure>
  );
};

export default Shop;
