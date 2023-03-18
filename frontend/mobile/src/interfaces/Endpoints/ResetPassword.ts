import { BaseResponse } from "./Base";

export interface ResetPasswordRequest {
  password: string;
}

export interface ResetPasswordResponse extends BaseResponse {
  customer: {
    name: string;
    session_token: string;
  };
}
