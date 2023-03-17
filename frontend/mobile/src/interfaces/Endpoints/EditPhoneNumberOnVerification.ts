export interface EditPhoneNumberOnVerificationRequest {
  phone_number: string;
}

export interface EditPhoneNumberOnVerificationResponse {
  status: string;
  customer: {
    session_token: string;
  };
}
