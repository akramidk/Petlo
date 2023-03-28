import { BaseResponse } from "./Base";

export interface AddNewPetRequest {
  name: string;
  kind: string;
  breed: string;
  gender: string;
  image?: string;
}

export interface AddNewPetResponse extends BaseResponse {}
