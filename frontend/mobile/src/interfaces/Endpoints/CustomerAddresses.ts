import { Address } from "../Entities/Address";

export interface CustomerAddressesRequest {
  page: number;
}

export interface CustomerAddressesResponse {
  has_more: boolean;
  data: Address[];
}
