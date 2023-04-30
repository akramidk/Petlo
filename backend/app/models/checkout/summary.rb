module Checkout::Summary
    def summary(country:, language:)
        cart_amount = Utils.number_to_currency(country: country, number: self.cart_amount)
        delivery_amount = Utils.number_to_currency(country: country, number: self.delivery_amount)
        amount = Utils.number_to_currency(country: country, number: self.amount)

        {
            public_id: self.public_id,
            cart_amount: cart_amount,
            delivery_amount: delivery_amount,
            amount: amount,
            currency: CONSTANTS::CURRENCIES[currency][language]
        }
    end
end