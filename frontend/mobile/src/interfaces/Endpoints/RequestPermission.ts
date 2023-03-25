import { APIPermissions } from "../../enums/APIPermissions";
import { BaseResponse } from "./Base";

export interface RequestPermissionRequest {
  permission: APIPermissions;
}

export interface RequestPermissionResponse extends BaseResponse {}
