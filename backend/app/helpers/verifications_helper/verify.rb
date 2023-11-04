module VerificationsHelper::Verify
  def verify(customer:, verification_code:, request:)
    checking = customer.verify_verification_code(
      code: verification_code,
      permission: "customer_verification" 
    )

    if checking[:valid]
      customer.phone_verified!
      session_token = SessionToken.generate(
        public_id: customer.public_id,
        phone_number: customer.phone_number
      )

      Tracking::TrackingJob.perform_async(
        "CompleteRegistration",
        request.user_agent,
        request.remote_ip,
        customer.public_id,
        customer.phone_number
      )

      { customer: { name: customer.name, session_token: session_token  } }
    end
  end
end
