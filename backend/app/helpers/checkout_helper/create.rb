module CheckoutHelper::Create
    def create(customer:, cart_id:, address_id:, language:)
        cart = customer.carts.find_by(public_id: cart_id)
        raise(RuntimeError, 3005000) if !cart
        raise(RuntimeError, 3005001) if cart.used?
        raise(RuntimeError, 3005002) if cart.created_at + CONSTANTS::TIMES[:CART_EXP_AFTER] < Time.now

        address = customer.addresses.find_by(public_id: address_id)
        raise(RuntimeError, 3005003) if !address

        cart_amount = cart.total(country: customer.country)
        delivery_amount = 2000 #not ready yet
        currency = CONSTANTS::COUNTRIES_CURRENCIES[customer.country]["en"]

        checkout = Checkout.create!(
            customer_id: customer.id,
            cart_id: cart.id,
            address_id: address.id,
            cart_amount: cart_amount,
            delivery_amount: delivery_amount,
            currency: currency
        )
        cart.used!

        checkout.summary(language: language)
    end
end