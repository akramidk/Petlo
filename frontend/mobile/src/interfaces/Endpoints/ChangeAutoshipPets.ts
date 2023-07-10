import { BaseResponse } from "./Base";

export interface ChangeAutoshipPetsRequest {
  pets: string[];
}

export interface ChangeAutoshipPetsResponse extends BaseResponse {}
