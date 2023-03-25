export interface ChangeCustomerPhoneNumberRequest {
  phone_number: string;
}

export interface ChangeCustomerPhoneNumberResponse {
  customer: {
    session_token: string;
  };
}
