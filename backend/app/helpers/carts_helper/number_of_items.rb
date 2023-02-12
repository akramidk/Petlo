module CartsHelper::NumberOfItems
    def number_of_items(customer:, cart_id:)
        cart = customer.carts.find_by(public_id: cart_id)
        raise(RuntimeError, 3004000) if !cart
        raise(RuntimeError, 3004005) if cart.used?
        raise(RuntimeError, 3004001) if cart.created_at + 24.hours < Time.now

        cart.items.count
    end
end