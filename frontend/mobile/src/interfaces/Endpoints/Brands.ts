import { Brand } from "../Entities/Brand";

export interface BrandsRequest {
  limit: number;
  featured?: boolean;
}

export interface BrandsResponse {
  has_more: boolean;
  data: Brand[];
}
