import { SectionItem } from "../Entities/SectionItem";

export interface SearchRequest {
  value: string;
}

export interface SearchResponse {
  has_more: boolean;
  data: SectionItem;
}
