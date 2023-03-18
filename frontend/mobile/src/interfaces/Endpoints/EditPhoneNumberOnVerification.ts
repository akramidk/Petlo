import { BaseResponse } from "./Base";

export interface EditPhoneNumberOnVerificationRequest {
  phone_number: string;
}

export interface EditPhoneNumberOnVerificationResponse extends BaseResponse {
  customer: {
    session_token: string;
  };
}
