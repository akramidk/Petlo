module CheckoutHelper::Index
    def index(customer:, cart_id:, address_id:, language:)
        cart = customer.carts.find_by(public_id: cart_id)
        raise(RuntimeError, ) if !cart #add the code
        raise(RuntimeError, ) if cart.created_at + 24.hours < Time.now #add the code

        address = customer.addresses.find_by(public_id: address_id)

        cart = cart.total(country: customer.country) / 1000 #not ready yet
        delivery = address ? 2 : nil #not ready yet
        total = cart + delivery.to_i

        {
            cart: cart,
            delivery: delivery,
            total: total,
            currency: CONSTANTS::COUNTRIES_CURRENCIES[customer.country][language]
        }
    end
end