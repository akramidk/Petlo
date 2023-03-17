export interface ResendVerificationCodeOnVerifySignInResponse {
  status: string; // TODO should be a type
  customer: {
    session_token: string;
  };
}
