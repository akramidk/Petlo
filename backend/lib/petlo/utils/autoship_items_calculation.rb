module Utils
  AUTOSHIP_DISCOUNT = 5
  def self.autoship_items_calculation(country:, data:, language:)
    items = []
    amount = 0

    filtered_data = {}
    data.each do |itemData|
      item = filtered_data[itemData[:item_id]]

      if item
        item << {
          variant_id: itemData[:variant_id],
          quantity: itemData[:quantity]
        }
      else
        filtered_data[itemData[:item_id]] = [
          {
            variant_id: itemData[:variant_id],
            quantity: itemData[:quantity]
          }
        ]
      end
    end

    filtered_data.keys.each do |key|
      item = Item.find_by(public_id: key)
      raise(RuntimeError, 3007008) unless item

      item_available = item.availabilities.find_by(country: country).value

      filtered_data_variants = filtered_data[key]

      variants = []
      filtered_data_variants.each do |elem|
        variant = Variant.find_by(public_id: elem[:variant_id])
        raise(RuntimeError, 3007009) unless variant

        variant_available = variant.availabilities.find_by(country: country).value
        available = variant_available && item_available

        options = []
        variant.options.each do |option|
          value = option.values.find_by(language: language).value
          unit = CONSTANTS::OPTION_UNITS.dig(option.unit, language)
          options.push((value + " " + unit.to_s).strip)
        end

        variant_amount = variant.prices.find_by(country: country).value * elem[:quantity]
        amount += variant_amount if available

        variants.push({
                        public_id: variant.public_id,
                        available: available,
                        options: options,
                        quantity: elem[:quantity],
                        amount: Utils.number_to_currency(
                          country: country,
                          number: variant_amount
                        )
                      })
      end

      name = item.details.find_by(language: language).name
      image = item.image.url

      items.push({
                   public_id: item.public_id,
                   name: name,
                   image: image,
                   variants: variants
                 })
    end

    amount_after_discount = amount - (amount * AUTOSHIP_DISCOUNT / 100)

    {
      items: items,
      amount: amount,
      amount_after_discount: amount_after_discount
    }
  end
end