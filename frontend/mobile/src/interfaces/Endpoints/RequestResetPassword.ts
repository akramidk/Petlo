export interface RequestResetPasswordRequest {
  phone_number: string;
}

export interface RequestResetPasswordResponse {
  customer: {
    session_token: string;
  };
}
