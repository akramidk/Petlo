module CartsHelper::Summary
    def summary(customer:, cart_id:, language:)
        cart = customer.carts.find_by(public_id: cart_id)
        raise(RuntimeError, 3004000) if !cart
        raise(RuntimeError, 3004005) if cart.used?
        #will ignore the time until v2
        #raise(RuntimeError, 3004001) if cart.created_at + CONSTANTS::TIMES[:CART_EXP_AFTER] < Time.now

        cart.summary(country: customer.country, language: language)
    end
end