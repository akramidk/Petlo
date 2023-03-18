module CustomersHelper::ResendResetPasswordCode
    def resend_reset_password_code(customer:, language:)
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