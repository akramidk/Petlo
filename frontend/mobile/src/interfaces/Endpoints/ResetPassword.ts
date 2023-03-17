export interface ResetPasswordRequest {
  password: string;
}

export interface ResetPasswordResponse {
  status: string;
  customer: {
    name: string;
    session_token: string;
  };
}
