import { BriefItem } from "../Entities/BriefItem";
import { BaseResponse } from "./Base";

export interface BrandItemsRequest {
  category_public_id?: string;
}

export interface BrandItemsResponse {
  has_more: boolean;
  data: BriefItem[];
}
