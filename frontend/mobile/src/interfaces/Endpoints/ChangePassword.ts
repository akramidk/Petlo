import { BaseResponse } from "./Base";

export interface ChangePasswordRequest {
  password: string;
}

export interface ChangePasswordResponse extends BaseResponse {}
