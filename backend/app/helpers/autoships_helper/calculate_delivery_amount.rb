module AutoshipsHelper::CalculateDeliveryAmount
  def calculate_delivery_amount(customer:, address_id:, language:)
    address = customer.addresses.find_by(public_id: address_id)
    raise(RuntimeError, 3007004) unless address

    {
      amount: Utils.number_to_currency(
        country: customer.country,
        number: CONSTANTS::DELIVERY_COSTS[customer.country]
      ),
      currency: CONSTANTS::COUNTRIES_CURRENCIES[customer.country][language]
    }
  end
end
