import { Brand } from "../../interfaces/Entities/Brand";
import PageStructure from "../organisms/PageStructure";
import BrandsList from "../organisms/BrandsList";

interface BrandsPage {
  backButton: () => void;
  onBrandClick: (brand: Brand) => void;
}

const BrandsPage = ({ backButton, onBrandClick }: BrandsPage) => {
  return (
    <PageStructure title="Brands" backButton={backButton} scrollEnabled={false}>
      <BrandsList limit={12} onBrandClick={onBrandClick} />
    </PageStructure>
  );
};

export default BrandsPage;
