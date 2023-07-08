module AutoshipsHelper::ItemsCalculation
  def items_calculation(customer:, data:, language:)
    amount = 0

    data.each do |obj|
      item = Item.find_by(public_id: obj[:item_id])
      raise(RuntimeError, 3007008) unless item

      variant = Variant.find_by(public_id: obj[:variant_id])
      raise(RuntimeError, 3007009) unless variant

      price = variant.prices.find_by(country: customer.country).value
      amount += price * obj[:quantity]
    end

    {
      amount: Utils.number_to_currency(
        country: customer.country,
        number: amount
      ),
      currency: CONSTANTS::COUNTRIES_CURRENCIES[customer.country][language]
    }
  end
end
