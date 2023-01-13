module CustomersHelper::Delete
    def delete(customer:, verification_code:)
        checking_permission = customer.verify_verification_code(
            code: verification_code,
            permission: ENUM::PERMISSIONS[:DELETE_CUSTOMER]
        )
        
        customer.update(deleted: true) if checking_permission[:valid]
    end
end