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
            name = item.details.find_by(language: language).name
            image = item.image.url
            variants = []

            self.items.where(item_id: id).select(:variant_id).group(:variant_id).count.each do |id, quantity|
                variant = Variant.find_by(id: id)
                variant_public_id = variant.public_id
                variant_amount = variant.prices.find_by(country: country).value * quantity
                amount += variant_amount
                options = []

                variant.options.each do |option|
                    options.push(option.values.find_by(language: language).value)
                end

                variants.push({
                    public_id: variant_public_id,
                    options: options,
                    quantity: quantity,
                    amount: variant_amount
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
            number_of_items: number_of_items,
            amount: amount,
            currency: currency,
            items: items
        }
    end
end