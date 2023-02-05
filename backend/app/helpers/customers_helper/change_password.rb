module CustomersHelper::ChangePassword
    def change_password(customer:, password:)
        Customer.validates_password(password: password)
        customer.update!(password: password)
    end
end