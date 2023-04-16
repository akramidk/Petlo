export interface BannersRequest {
  variant: "masculine" | "feminine";
}

export interface BannersResponse {
  data: {
    public_id: string;
    image: string;
    path: string;
  };
}
