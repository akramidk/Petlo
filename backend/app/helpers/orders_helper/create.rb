module OrdersHelper::Create
    def create(customer:, checkout_id:, payment:, pets:)
        checkout = customer.checkouts.find_by(public_id: checkout_id)
        raise(RuntimeError, ) if !checkout
        raise(RuntimeError, ) if checkout.used?
        raise(RuntimeError, ) if checkout.created_at + CONSTANTS::TIMES[:CHECKOUT_EXP_AFTER] < Time.now

        cart = customer.carts.find_by(id: checkout.cart_id)
        raise(RuntimeError, ) if !cart
        raise(RuntimeError, ) if cart.used?
        raise(RuntimeError, ) if cart.created_at + CONSTANTS::TIMES[:CART_EXP_AFTER] < Time.now
    end
end