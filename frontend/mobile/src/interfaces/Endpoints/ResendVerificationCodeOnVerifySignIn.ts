import { BaseResponse } from "./Base";

export interface ResendVerificationCodeOnVerifySignInResponse
  extends BaseResponse {
  customer: {
    session_token: string;
  };
}
