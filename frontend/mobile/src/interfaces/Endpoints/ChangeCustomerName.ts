import { BaseResponse } from "./Base";

export interface ChangeCustomerNameRequest {
  name: string;
}

export interface ChangeCustomerNameResponse extends BaseResponse {}
