import { Pet } from "../Entities/Pet";

export interface CustomerPetsRequest {
  page: number;
}

export interface CustomerPetsResponse {
  has_more: boolean;
  data: Pet[];
}
