module SessionsHelper
  def self.create(phone_number:, password:, language:)
    customer = Customer.find_by(phone_number: phone_number)

    if customer && customer.try(:authenticate, password)
      customer_verified = customer.phone_verified?
      permission = customer_verified ? ENUM::SESSION_TOKEN_PERMISSIONS[:SESSION_VERIFICATION] : ENUM::SESSION_TOKEN_PERMISSIONS[:CUSTOMER_VERIFICATION]

      session_token = SessionToken.generate(
        public_id: customer.public_id,
        phone_number: customer.phone_number,
        limited: true,
        limited_for: permission
      )

      Customer::VerificationJob.perform_async(
        customer.public_id,
        permission,
        language
      )

      { customer: { verified: customer_verified, session_token: session_token }  }
    else
      raise("invalid_credentials")
    end
  end
end 
