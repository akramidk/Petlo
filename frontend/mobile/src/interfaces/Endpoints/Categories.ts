import { BriefItem } from "../Entities/BriefItem";

export interface CategoriesRequest {
  page: number;
  brand_public_id: null | string;
}

export interface CategoriesResponse {
  has_more: boolean;
  data: BriefItem[];
}
