module CustomersHelper::ChangeName
    def change_name(customer:, name:)
        customer.update!(name: name)
    end
end