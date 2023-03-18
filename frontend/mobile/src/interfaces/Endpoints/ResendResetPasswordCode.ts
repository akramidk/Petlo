import { BaseResponse } from "./Base";

export interface ResendResetPasswordCodeResponse extends BaseResponse {
  customer: {
    session_token: string;
  };
}
