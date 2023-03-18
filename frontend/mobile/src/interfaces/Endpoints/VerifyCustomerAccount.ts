import { BaseResponse } from "./Base";

export interface VerifyCustomerAccountRequest {
  verification_code: number;
}

export interface VerifyCustomerAccountResponse extends BaseResponse {
  customer: {
    name: string;
    session_token: string;
  };
}
