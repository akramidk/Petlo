module CustomersHelper::ResetPassword
    def reset_password(customer:, new_password:)
        customer.update!(password: new_password)
    end
end