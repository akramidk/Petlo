import { Brand } from "../../interfaces/Entities/Brand";
import PageStructure from "../organisms/PageStructure";
import BrandsList from "../organisms/BrandsList";
import { useTranslationsContext } from "../../hooks";

interface BrandsPage {
  backButton: () => void;
  onBrandClick: (brand: Brand) => void;
}

const BrandsPage = ({ backButton, onBrandClick }: BrandsPage) => {
  const { t } = useTranslationsContext();

  return (
    <PageStructure
      title={t("COMMON__BRANDS")}
      backButton={backButton}
      scrollEnabled={false}
    >
      <BrandsList limit={12} onBrandClick={onBrandClick} />
    </PageStructure>
  );
};

export default BrandsPage;
