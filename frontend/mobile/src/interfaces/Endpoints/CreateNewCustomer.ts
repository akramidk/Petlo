import { BaseResponse } from "./Base";

export interface CreateNewCustomerRequest {
  name: string;
  country: string;
  phone_number: string;
  password: string;
}

export interface CreateNewCustomerResponse extends BaseResponse {
  customer: {
    session_token: string;
  };
}
