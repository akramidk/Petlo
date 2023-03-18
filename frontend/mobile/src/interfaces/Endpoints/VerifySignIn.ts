import { BaseResponse } from "./Base";

export interface VerifySignInRequest {
  verification_code: number;
}

export interface VerifySignInResponse extends BaseResponse {
  customer: {
    name: string;
    session_token: string;
  };
}
