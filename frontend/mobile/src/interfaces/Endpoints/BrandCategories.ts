import { BaseResponse } from "./Base";

export interface AddNewAddressRequest {
  name: string;
  longitude: string;
  latitude: string;
}

export interface BrandCategoriesResponse {
  data: {
    public_id: string;
    name: string;
  }[];
}
