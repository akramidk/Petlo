module CustomersHelper::Create
  def create(name:, country:, phone_number:, password:, language:, request:)
    Customer.validates_password(password: password)

    customer = Customer.create!(
      name: name,
      country: country,
      phone_number: phone_number,
      password: password
    )

    session_token = SessionToken.generate(
      public_id: customer.public_id,
      phone_number: customer.phone_number,
      limited: true,
      limited_for: ENUM::PERMISSIONS[:CUSTOMER_VERIFICATION]
    )

    Customer::VerificationJob.perform_async(
      customer.public_id,
      ENUM::PERMISSIONS[:CUSTOMER_VERIFICATION],
      language
    )

    TrackingJob.perform_async(
      "Registration",
      request.user_agent,
      request.remote_ip,
      customer.public_id,
      customer.phone_number
    )
    
    { customer: { session_token: session_token } }
  end
end
