import { BriefItem } from "../Entities/BriefItem";
import { BaseResponse } from "./Base";

export interface BrandItemsRequest {
  category_public_id?: string;
  limit: number;
}

export interface BrandItemsResponse {
  has_more: boolean;
  data: BriefItem[];
}
