module CheckoutHelper::UpdateAddress
    def update_address(customer:, public_id:, address_id:, language:)
        checkout = customer.checkouts.find_by(public_id: public_id)
        raise(RuntimeError, 3005004) if !checkout
        raise(RuntimeError, 3005005) if checkout.used?
        #will ignore the time until v2
        #raise(RuntimeError, 3005006) if checkout.created_at + CONSTANTS::TIMES[:CHECKOUT_EXP_AFTER] < Time.now

        address = customer.addresses.find_by(public_id: address_id)
        raise(RuntimeError, 3005003) if !address

        delivery_amount = CONSTANTS::DELIVERY_COSTS[customer.country]
        checkout.update!(address: address, delivery_amount: delivery_amount)

        checkout.summary(country: customer.country, language: language)
    end
end