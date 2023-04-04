import { BriefItem } from "../Entities/BriefItem";

export interface CategoriesRequest {
  page: number;
}

export interface CategoriesResponse {
  has_more: boolean;
  data: BriefItem[];
}
