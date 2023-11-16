export interface BrandsListProps {
  limit: number;
  fetchMore?: boolean;
  title?: string;
  showAllButton?: Boolean;
  onShowAllButtonClick?: () => void;
}
