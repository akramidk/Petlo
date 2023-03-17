export interface RequestResetPasswordVerificationRequest {
  verification_code: number;
}

export interface RequestResetPasswordVerificationResponse {
  status: string;
  customer: {
    session_token: string;
  };
}
