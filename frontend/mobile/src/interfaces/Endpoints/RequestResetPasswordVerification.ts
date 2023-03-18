import { BaseResponse } from "./Base";

export interface RequestResetPasswordVerificationRequest {
  verification_code: number;
}

export interface RequestResetPasswordVerificationResponse extends BaseResponse {
  customer: {
    session_token: string;
  };
}
