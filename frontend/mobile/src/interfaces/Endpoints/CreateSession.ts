import { BaseResponse } from "./Base";

export interface CreateSessionRequest {
  phone_number: string;
  password: string;
}

export interface CreateSessionResponse extends BaseResponse {
  customer: { verified: boolean; session_token: string };
}
