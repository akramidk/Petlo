module CustomersHelper::Index
    def index(customer:, language:)
        {
            name: customer.name,
            phone_number: customer.phone_number,
            country: CONSTANTS::COUNTRIES[customer.country][language]
        }
    end
end