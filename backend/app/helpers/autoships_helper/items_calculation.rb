module AutoshipsHelper::ItemsCalculation
  def items_calculation(customer:, data:, language:)
    result = Utils.autoship_items_calculation(country: customer.country, data: data, language: language)

    {
      items: result[:items],
      amount: Utils.number_to_currency(
        country: customer.country,
        number: result[:amount]
      ),
      amount_after_discount: Utils.number_to_currency(
        country: customer.country,
        number: result[:amount_after_discount]
      ),
      currency: CONSTANTS::COUNTRIES_CURRENCIES[customer.country][language]
    }
  end
end
