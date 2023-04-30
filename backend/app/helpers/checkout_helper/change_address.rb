module CheckoutHelper::ChangeAddress
    def change_address(customer:, public_id:, address_id:, language:)
        checkout = customer.checkouts.find_by(public_id: public_id)
        raise(RuntimeError, 3005004) if !checkout
        raise(RuntimeError, 3005005) if checkout.used?
        raise(RuntimeError, 3005006) if checkout.created_at + CONSTANTS::TIMES[:CHECKOUT_EXP_AFTER] < Time.now

        address = customer.addresses.find_by(public_id: address_id)
        raise(RuntimeError, 3005003) if !address

        delivery_amount = 2000 # TODO not ready yet, fix it
        checkout.update!(address: address, delivery_amount: delivery_amount)

        checkout.summary(country: customer.country, language: language)
    end
end