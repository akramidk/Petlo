import { BriefItem } from "../Entities/BriefItem";

export interface CategoryRequest {
  page: number;
  brand_public_id: null | string;
}

export interface CategoryResponse {
  has_more: boolean;
  data: BriefItem[];
}
