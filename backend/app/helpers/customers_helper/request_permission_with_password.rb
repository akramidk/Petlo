module CustomersHelper::RequestPermissionWithPassword
    PERMISSIONS = [
        ENUM::PERMISSIONS[:CHANGE_CUSTOMER_PHONE_NUMBER]
    ]

    def request_permission_with_password(customer:, permission:, password:)
        raise(RuntimeError, 3003000) if !PERMISSIONS.include?(permission)
        raise(RuntimeError, 3003002) if !customer.try(:authenticate, password)

        SessionToken.generate(
            public_id: customer.public_id,
            phone_number: customer.phone_number,
            limited: true,
            limited_for: permission
        )
    end
end