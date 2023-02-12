module Checkout::Summary
    def summary(language:)
        currency = self.currency
        smallest_unit_multiplier = CONSTANTS::CURRENCIES_SMALLEST_UNIT_MULTIPLIER[currency]
        cart_amount = self.cart_amount / smallest_unit_multiplier
        delivery_amount = self.delivery_amount / smallest_unit_multiplier
        amount = self.amount / smallest_unit_multiplier

        {
            public_id: self.public_id,
            cart_amount: cart_amount,
            delivery_amount: delivery_amount,
            amount: amount,
            currency: CONSTANTS::CURRENCIES[currency][language]
        }
    end
end