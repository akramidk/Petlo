module CustomersHelper
  class << self
    def create(name:, country:, phone_number:, password:, language:)
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
          limited_for: ENUM::SESSION_TOKEN_PERMISSIONS[:CUSTOMER_VERIFICATION]
        )

        Customer::VerificationJob.perform_async(
          customer.public_id,
          ENUM::SESSION_TOKEN_PERMISSIONS[:CUSTOMER_VERIFICATION],
          language
        )
        
        { session_token: session_token }
      rescue ActiveRecord::RecordInvalid => invalid
        raise(ActiveRecordError.extract(object: invalid))
      end
    end
  end
end
