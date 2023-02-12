module CheckoutHelper::Create
    def create(customer:, cart_id:, address_id:, language:)
        cart = customer.carts.find_by(public_id: cart_id)
        raise(RuntimeError, 3005000) if !cart
        raise(RuntimeError, 3005001) if cart.used?
        raise(RuntimeError, 3005002) if cart.created_at + 24.hours < Time.now #add the code

        address = customer.addresses.find_by(public_id: address_id)
        raise(RuntimeError, 3005003) if !address

        currency = CONSTANTS::COUNTRIES_CURRENCIES[customer.country]
        currency_code = currency["en"]
        cart_amount = cart.total(country: customer.country) / CONSTANTS::CURRENCIES_SMALLEST_UNIT_MULTIPLIER[currency_code]
        delivery_amount = 2 #not ready yet
        total_amount = cart_amount + delivery_amount

        checkout = Checkout.create!(
            customer_id: customer.id,
            cart_id: cart.id,
            address_id: address.id,
            cart_amount: cart_amount,
            delivery_amount: delivery_amount,
            amount: total_amount,
            currency: currency_code
        )

        {
            public_id: checkout.public_id,
            cart_amount: checkout.cart_amount,
            delivery_amount: checkout.delivery_amount,
            amount: checkout.amount,
            currency: currency[language]
        }
    end
end