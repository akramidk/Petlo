module Checkout::Summary
    def summary(country:, language:)
        cart_amount = Utils.number_to_currency(country: country, number: self.cart_amount)
        delivery_amount = Utils.number_to_currency(country: country, number: self.delivery_amount)
        #TODO should be better, and handles other countries
        delivery_estimation = Utils.utc_to_local_time(country: country).hour < 21 ? I18n.t!("delivery_estimation.today") : I18n.t!("delivery_estimation.tomorrow")
        amount = Utils.number_to_currency(country: country, number: self.amount)

        {
            public_id: self.public_id,
            cart_amount: cart_amount,
            delivery_amount: delivery_amount,
            delivery_estimation: delivery_estimation,
            amount: amount,
            currency: CONSTANTS::CURRENCIES[currency][language]
        }
    end
end