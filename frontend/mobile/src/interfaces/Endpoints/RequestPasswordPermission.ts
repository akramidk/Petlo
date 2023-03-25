import { APIPermissions } from "../../enums/APIPermissions";
import { Customer } from "../Entities/Customer";

export interface RequestPasswordPermissionRequest {
  permission: APIPermissions;
  password: string;
}

export interface RequestPasswordPermissionResponse {
  customer: {
    session_token: string;
  };
}
