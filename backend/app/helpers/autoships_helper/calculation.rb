module AutoshipsHelper::Calculation
  def calculation(customer:, address_id:, items:, language:)
    address = customer.addresses.find_by(public_id: address_id)
    raise(RuntimeError, 3007004) unless address

    items_calculation = Utils.autoship_items_calculation(country: customer.country, data: items, language: language)

    items_amount = items_calculation[:amount]
    items_amount_after_discount = items_calculation[:amount_after_discount]
    delivery_amount = CONSTANTS::DELIVERY_COSTS[customer.country]
    total = items_amount_after_discount + delivery_amount

    {
      items_amount: Utils.number_to_currency(
        country: customer.country,
        number: items_amount
      ),
      items_amount_after_discount: Utils.number_to_currency(
        country: customer.country,
        number: items_amount_after_discount
      ),
      delivery_amount: Utils.number_to_currency(
        country: customer.country,
        number: delivery_amount
      ),
      total: Utils.number_to_currency(
        country: customer.country,
        number: total
      ),
      currency: CONSTANTS::COUNTRIES_CURRENCIES[customer.country][language]
    }
  end
end
