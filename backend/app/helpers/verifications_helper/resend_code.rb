module VerificationsHelper::ResendCode
  def resend_code(customer:, language:)
    session_token = SessionToken.generate(
      public_id: customer.public_id,
      phone_number: customer.phone_number,
      limited: true,
      limited_for: ENUM::VERIFICATION_CODE_PERMISSIONS[:CUSTOMER_VERIFICATION]
    )

    Customer::VerificationJob.perform_async(
      customer.public_id,
      ENUM::VERIFICATION_CODE_PERMISSIONS[:CUSTOMER_VERIFICATION],
      language
    )

    { customer: { session_token: session_token } }
  end
end
