module CartsHelper::AddItem
    def add_item(customer:, cart_id:, item_id:, variant_id:, language:)
        cart = customer.carts.find_by(public_id: cart_id)
        raise(RuntimeError, 3004000) if !cart
        raise(RuntimeError, 3004001) if cart.created_at + 24.hours < Time.now

        item = Item.joins(
            :availabilities
        ).where(availabilities: {
            country: customer.country,
            value: true
        }).find_by(
            public_id: item_id
        )
        raise(RuntimeError, 3004002) if !item

        variant = item.variants.joins(
            :availabilities
        ).where(availabilities: {
            country: customer.country,
            value: true
        }).find_by(
            public_id: variant_id
        )
        raise(RuntimeError, 3004003) if !variant

        CartItem.create!(
            cart_id: cart.id,
            item_id: item.id,
            variant_id: variant.id
        )

        cart.summary(country: customer.country, language: language)
    end
end