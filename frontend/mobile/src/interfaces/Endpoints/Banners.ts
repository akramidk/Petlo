import { Banner } from "../Entities/Banner";

export interface BannersRequest {
  variant: "masculine" | "feminine";
}

export interface BannersResponse {
  data: Banner[];
}
