export interface BrandsListProps {
  limit: number;
  fetchMore?: boolean;
  title?: string;
  showAllButton?: Boolean;
  onShowAllButtonClick?: () => void;
  onBrandClick: (public_id: string) => void;
}
