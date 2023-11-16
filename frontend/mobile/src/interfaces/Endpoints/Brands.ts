import { Brand } from "../Entities/Brand";

export interface BrandsRequest {
  limit: number;
}

export interface BrandsResponse {
  has_more: boolean;
  data: Brand[];
}
