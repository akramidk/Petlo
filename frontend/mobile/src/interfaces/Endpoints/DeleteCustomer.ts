import { BaseResponse } from "./Base";

export interface DeleteCustomerRequest {
  verification_code: number;
}

export interface DeleteCustomerResponse extends BaseResponse {}
