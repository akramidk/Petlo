module SessionsHelper::Create
  def create(phone_number:, password:, language:)
    customer = Customer.find_by(phone_number: phone_number, deleted: nil)

    if customer && customer.try(:authenticate, password)
      customer_verified = customer.phone_verified?
      permission = customer_verified ? ENUM::PERMISSIONS[:SESSION_VERIFICATION] : ENUM::PERMISSIONS[:CUSTOMER_VERIFICATION]

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
      raise(RuntimeError, 3002000)
    end
  end
end 
