module CustomersHelper::ChangePhoneNumber
    def change_phone_number(customer:, phone_number:, language:)
        raise(RuntimeError, 3003003) if customer.phone_number == phone_number
        customer.update!(phone_number: phone_number, phone_verification_status: "unverified")

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

        session_token
    end
end