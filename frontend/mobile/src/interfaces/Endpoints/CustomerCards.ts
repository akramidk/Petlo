import { Card } from "../Entities/Card";

export interface CustomerCardsRequest {
  page: number;
}

export interface CustomerCardsResponse {
  has_more: boolean;
  data: Card[];
}
