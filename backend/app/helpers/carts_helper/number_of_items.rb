module CartsHelper::NumberOfItems
    def number_of_items(customer:, cart_id:)
        cart = customer.carts.find_by(public_id: cart_id)
        raise(RuntimeError, 3004000) if !cart
        raise(RuntimeError, 3004005) if cart.used?
        #will ignore the time until v2
        #raise(RuntimeError, 3004001) if cart.created_at + CONSTANTS::TIMES[:CART_EXP_AFTER] < Time.now

        cart.items.count
    end
end