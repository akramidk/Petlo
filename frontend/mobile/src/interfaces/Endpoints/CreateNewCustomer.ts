export interface CreateNewCustomerRequest {
  name: string;
  country: string;
  phone_number: string;
  password: string;
}

export interface CreateNewCustomerResponse {
  status: string;
  customer: {
    session_token: string;
  };
}
