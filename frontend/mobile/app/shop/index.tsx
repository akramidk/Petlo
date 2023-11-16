import { useRouter } from "expo-router";
import { View } from "react-native";
import { BrandsList, PageStructure } from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";
import { CopyPhoneNumberButton } from "../_CopyPhoneNumberButton";

const Shop = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <PageStructure title="Shop" backButton={router.back}>
      <BrandsList />
    </PageStructure>
  );
};

export default Shop;
