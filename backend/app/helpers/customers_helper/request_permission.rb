module CustomersHelper::RequestPermission
    PERMISSIONS = [
        ENUM::PERMISSIONS[:DELETE_CUSTOMER]
    ]

    def request_permission(customer:, permission:, language:)
        raise(RuntimeError, 3003000) if !PERMISSIONS.include?(permission)

        Customer::VerificationJob.perform_async(
            customer.public_id,
            permission,
            language
        )
    end
end