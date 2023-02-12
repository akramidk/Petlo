module CartsHelper::RemoveItem
    def remove_item(customer:, cart_id:, item_id:, variant_id:, language:)
        cart = customer.carts.find_by(public_id: cart_id)
        raise(RuntimeError, 3004000) if !cart
        raise(RuntimeError, 3004005) if cart.used?
        raise(RuntimeError, 3004001) if cart.created_at + CONSTANTS::TIMES[:CART_EXP_AFTER] < Time.now

        item = Item.find_by(public_id: item_id)
        raise(RuntimeError, 3004002) if !item

        variant = Variant.find_by(public_id: variant_id)
        raise(RuntimeError, 3004003) if !variant

        cart_item = cart.items.find_by(item_id: item.id, variant_id: variant.id)
        raise(RuntimeError, 3004004) if !cart_item

        cart_item.destroy!
        cart.summary(country: customer.country, language: language)
    end
end