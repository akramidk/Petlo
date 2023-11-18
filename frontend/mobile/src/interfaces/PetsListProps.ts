import { Category } from "./Entities/Category";

export interface PetsListProps {
  title?: string;
  onPetClick: (pet: Category) => void;
}
