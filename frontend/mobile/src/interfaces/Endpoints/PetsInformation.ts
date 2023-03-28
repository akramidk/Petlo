export interface PetsInformationResponse {
  data: {
    key: string;
    value: string;
    breeds: {
      key: string;
      value: string;
    }[];
  }[];
}
