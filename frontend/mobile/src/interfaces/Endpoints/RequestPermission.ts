import { APIPermissions } from "../../enums";
import { BaseResponse } from "./Base";

export interface RequestPermissionRequest {
  permission: APIPermissions;
}

export interface RequestPermissionResponse extends BaseResponse {}
