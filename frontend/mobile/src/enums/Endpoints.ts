export enum Endpoints {
  NEW_VERSION_AVAILABLE = "/v1/apps/new-version-available",
  CHECK_SESSION = "/v1/sessions",
  CREATE_NEW_CUSTOMER = "/v1/customers",
  VERIFY_CUSTOMER_ACCOUNT = "/v1/customers/verification",
  RESEND_VERIFICATION_CODE = "/v1/customers/verification/resend-code",
  EDIT_PHONE_NUMBER_ON_VERIFICATION = "/v1/customers/verification/change-phone-number",
  CREATE_SESSION = "/v1/sessions",
  VERIFY_SIGN_IN = "/v1/sessions/verification",
  RESEND_VERIFICATION_CODE_ON_VERIFY_SIGN_IN = "/v1/sessions/verification/resend-code",
  REQUEST_RESET_PASSWORD = "/v1/customers/request-reset-password",
  REQUEST_RESET_PASSWORD_VERIFICATION = "/v1/customers/verify-reset-password-request",
  RESET_PASSWORD = "/v1/customers/reset-password",
}
