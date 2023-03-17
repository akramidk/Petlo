export interface VerifyCustomerAccountRequest {
  verification_code: number;
}

export interface VerifyCustomerAccountResponse {
  status: string;
  customer: {
    name: string;
    session_token: string;
  };
}
