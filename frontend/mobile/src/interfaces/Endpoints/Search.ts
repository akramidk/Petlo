import { BriefItem } from "../Entities/BriefItem";

export interface SearchRequest {
  value: string;
}

export interface SearchResponse {
  has_more: boolean;
  data: BriefItem;
}
