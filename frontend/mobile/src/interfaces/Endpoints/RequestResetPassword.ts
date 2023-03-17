export interface RequestResetPasswordRequest {
  phone_number: string;
}

export interface RequestResetPasswordResponse {
  customer: {
    name: string;
    session_token: string;
  };
}
