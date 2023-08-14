module CustomersHelper::RequestResetPassword
    def request_reset_password(phone_number:, language:)
        customer = Customer.find_by(phone_number: phone_number, deleted: nil)
        raise(RuntimeError, 3003001) if !customer

        permission = ENUM::PERMISSIONS[:VERIFY_RESET_PASSWORD_REQUEST]
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
        
        { customer: { session_token: session_token } }
    end
end