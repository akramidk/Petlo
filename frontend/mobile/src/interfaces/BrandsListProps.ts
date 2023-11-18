import { Brand } from "./Entities/Brand";

export interface BrandsListProps {
  limit: number;
  fetchMore?: boolean;
  title?: string;
  showAllButton?: Boolean;
  onShowAllButtonClick?: () => void;
  onBrandClick: (brand: Brand) => void;
  featuredBrandsOnly?: boolean;
}
