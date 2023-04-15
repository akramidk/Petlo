module Cart::Summary
    def summary(country:, language:)
        public_id = self.public_id
        number_of_items = self.items.count
        amount = 0
        currency = CONSTANTS::COUNTRIES_CURRENCIES[country][language]
        items = []

        self.items.select(:item_id).group(:item_id).each do |cart_item|
            id = cart_item.item_id
            item = Item.find_by(id: id)
            item_public_id = item.public_id
            item_available = item.availabilities.find_by(country: country).value
            name = item.details.find_by(language: language).name
            image = item.image.url
            variants = []

            self.items.where(item_id: id).select(:variant_id).group(:variant_id).count.each do |id, quantity|
                variant = Variant.find_by(id: id)
                variant_public_id = variant.public_id
                variant_amount = variant.prices.find_by(country: country).value * quantity
                variant_available = variant.availabilities.find_by(country: country).value
                available = variant_available && item_available
                amount += variant_amount if available
                options = []

                variant.options.each do |option|
                    value = option.values.find_by(language: language).value
                    unit = CONSTANTS::OPTION_UNITS.dig(option.unit, language)
                    options.push((value + " " + unit.to_s).strip)
                end

                variants.push({
                    public_id: variant_public_id,
                    available: available,
                    options: options,
                    quantity: quantity,
                    amount: Utils.number_to_currency(
                        country: country,
                        number: variant_amount
                    )
                })
            end

            items.push({
                public_id: item_public_id,
                name: name,
                image: image,
                variants: variants
            })
        end

        {
            public_id: public_id,
            exp_at: self.created_at + CONSTANTS::TIMES[:CART_EXP_AFTER],
            number_of_items: number_of_items,
            amount: Utils.number_to_currency(
                country: country,
                number: amount
            ),
            currency: currency,
            items: items
        }
    end
end