export interface VerifySignInRequest {
  verification_code: number;
}

export interface VerifySignInResponse {
  status: string;
  customer: {
    name: string;
    session_token: string;
  };
}
