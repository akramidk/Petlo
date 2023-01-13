module CustomersHelper::VerifyResetPasswordRequest
    def verify_reset_password_request(customer:, verification_code:)
        checking_permission = customer.verify_verification_code(
            code: verification_code,
            permission: ENUM::PERMISSIONS[:VERIFY_RESET_PASSWORD_REQUEST]
        )

        if checking_permission[:valid]
            session_token = SessionToken.generate(
                public_id: customer.public_id,
                phone_number: customer.phone_number,
                limited: true,
                limited_for: ENUM::PERMISSIONS[:RESET_PASSWORD]
            )

            { customer: { session_token: session_token } }
        end
    end
end