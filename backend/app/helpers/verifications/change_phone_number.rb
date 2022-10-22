module VerificationsHelper
  def self.change_phone_number(customer:, phone_number:, language:)
    raise("customer_verified_before") if customer.phone_verified?

    begin
      customer.update!(
        phone_number: phone_number
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
