module Cart::Total
    def total(country:)
        amount = 0

        self.items.select(:item_id).group(:item_id).each do |cart_item|
            id = cart_item.item_id
            item = Item.find_by(id: id)
            item_available = item.availabilities.find_by(country: country).value
            next if !item_available

            self.items.where(item_id: id).select(:variant_id).group(:variant_id).count.each do |id, quantity|
                variant = Variant.find_by(id: id)
                variant_available = variant.availabilities.find_by(country: country).value
                next if !variant_available
            
                price = variant.prices.find_by(country: country).value
                amount += price * quantity
            end
        end

        Utils.number_to_currency(
            country: country,
            number: amount
        )
    end
end