import { BaseResponse } from "./Base";

export interface ResendVerificationCodeResponse extends BaseResponse {
  customer: {
    session_token: string;
  };
}
