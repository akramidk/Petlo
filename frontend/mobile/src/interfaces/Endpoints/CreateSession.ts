export interface CreateSessionRequest {
  phone_number: string;
  password: string;
}

export interface CreateSessionResponse {
  status: string;
  customer: { verified: boolean; session_token: string };
}
