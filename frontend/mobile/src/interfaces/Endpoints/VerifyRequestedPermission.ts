import { APIPermissions } from "../../enums/APIPermissions";
import { BaseResponse } from "./Base";

export interface VerifyRequestedPermissionRequest {
  permission: APIPermissions;
  verification_code: number;
}

export interface VerifyRequestedPermissionResponse extends BaseResponse {
  customer: {
    session_token: string;
  };
}
