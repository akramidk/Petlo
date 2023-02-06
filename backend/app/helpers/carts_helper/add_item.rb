module CartsHelper::AddItem
    def add_item(customer:, cart_id:, item_id:, variant_id:)
        cart = customer.carts.find_by(public_id: cart_id)
        raise(RuntimeError, 3004000) if !cart
        raise(RuntimeError, 3004001) if cart.created_at + 24.hours < Time.now

        item = Item.find_by(public_id: item_id)
        raise(RuntimeError, 3004002) if !item

        variant = Variant.find_by(public_id: variant_id)
        raise(RuntimeError, 3004003) if !variant

        CartItem.create!(
            cart_id: cart.id,
            item_id: item.id,
            variant_id: variant.id
        )
    end
end