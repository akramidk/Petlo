module CustomersHelper::VerifyRequestedPermissionWithOtp
    PERMISSIONS = [
        ENUM::PERMISSIONS[:CHANGE_CUSTOMER_PASSWORD]
    ]

    def verify_requested_permission_with_otp(customer:, verification_code:, permission:)
        customer.verify_verification_code(
            code: verification_code,
            permission: permission
        )

        SessionToken.generate(
            public_id: customer.public_id,
            phone_number: customer.phone_number,
            limited: true,
            limited_for: permission
        )
    end
end