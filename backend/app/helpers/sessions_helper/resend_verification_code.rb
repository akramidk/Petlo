module SessionsHelper::ResendVerificationCode
  def resend_verification_code(customer:, language:)
    session_token = SessionToken.generate(
      public_id: customer.public_id,
      phone_number: customer.phone_number,
      limited: true,
      limited_for: ENUM::SESSION_TOKEN_PERMISSIONS[:SESSION_VERIFICATION]
    )

    Customer::VerificationJob.perform_async(
      customer.public_id,
      ENUM::SESSION_TOKEN_PERMISSIONS[:SESSION_VERIFICATION],
      language
    )

    { customer: { session_token: session_token } }
  end
end
