import { BriefItem } from "../Entities/BriefItem";
import { BaseResponse } from "./Base";

export interface CategoryItemsRequest {
  limit: number;
}

export interface CategoryItemsResponse {
  has_more: boolean;
  data: BriefItem[];
}
