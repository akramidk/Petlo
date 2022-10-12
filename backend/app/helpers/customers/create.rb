module CustomersHelper
  def self.create(name, country, phone_number, password, language)
    begin
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
        limited_for: "customer_verification"
      )

      Customer::VerificationJob.perform_async(
        customer.public_id,
        "customer_verification",
        language
      )
      
      {
        body: {
          status: "succeeded",
          session_token: session_token
        },
        status: 200
      }
    rescue ActiveRecord::RecordInvalid => invalid
      {
        body: {
          status: "failed",
          message: invalid.record.errors.objects.first.full_message
        },
        status: 400
      }
    end
  end
end
