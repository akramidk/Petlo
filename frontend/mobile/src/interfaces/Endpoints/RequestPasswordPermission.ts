import { APIPermissions } from "../../enums";

export interface RequestPasswordPermissionRequest {
  permission: APIPermissions;
  password: string;
}

export interface RequestPasswordPermissionResponse {
  customer: {
    session_token: string;
  };
}
