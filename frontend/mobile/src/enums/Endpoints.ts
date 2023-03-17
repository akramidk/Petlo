export enum Endpoints {
  NEW_VERSION_AVAILABLE = "/v1/apps/new-version-available",
  CHECK_SESSION = "/v1/sessions",
  CREATE_NEW_CUSTOMER = "/v1/customers",
  VERIFY_CUSTOMER_ACCOUNT = "/v1/customers/verification",
  RESEND_VERIFICATION_CODE = "/v1/customers/verification/resend-code",
  EDIT_PHONE_NUMBER_ON_VERIFICATION = "/v1/customers/verification/change-phone-number",
  CREATE_SESSION = "/v1/sessions",
}
