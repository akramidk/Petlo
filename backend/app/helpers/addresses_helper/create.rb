module AddressesHelper::Create
    def create(customer:, name:, longitude:, latitude:)
      Address.create!(
        customer_id: customer.id,
        name: name,
        longitude: longitude,
        latitude: latitude
      )
    end
end