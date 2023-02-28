export interface NewVersionAvailableRequest {
  app_version: string;
  phone_os: "android" | "ios";
}

export interface NewVersionAvailableResponse {
  value: boolean;
}
