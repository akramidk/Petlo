import { BaseResponse } from "./Base";

export interface AddNewAddressRequest {
  name: string;
  longitude: string;
  latitude: string;
}

export interface AddNewAddressResponse extends BaseResponse {}
