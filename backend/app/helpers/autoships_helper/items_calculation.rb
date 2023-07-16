module AutoshipsHelper::ItemsCalculation
  def items_calculation(customer:, data:, language:)
    result = Utils.autoship_items_calculation(country: customer.country, data: data, language: language)

    {
      items: result[:items],
      amount: Utils.number_to_currency(
        country: customer.country,
        number: result[:amount]
      ),
      usd_amount: Utils.number_to_usd(
        country: customer.country,
        number: result[:amount],
        as_string: true
      ),
      amount_after_discount: Utils.number_to_currency(
        country: customer.country,
        number: result[:amount_after_discount]
      ),
      usd_amount_after_discount: Utils.number_to_usd(
        country: customer.country,
        number: result[:amount_after_discount],
        as_string: true
      ),
      currency: CONSTANTS::COUNTRIES_CURRENCIES[customer.country][language]
    }
  end
end
