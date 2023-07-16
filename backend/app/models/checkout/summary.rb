module Checkout::Summary
    def summary(country:, language:)
        cart_amount = Utils.number_to_currency(country: country, number: self.cart_amount)
        usd_cart_amount = Utils.number_to_usd(country: country, number: self.cart_amount, as_string: true)
        delivery_amount = Utils.number_to_currency(country: country, number: self.delivery_amount)
        usd_delivery_amount = Utils.number_to_usd(country: country, number: self.delivery_amount, as_string: true)
        #TODO should be better, and handles other countries
        delivery_estimation = Utils.utc_to_local_time(country: country).hour < 21 ? I18n.t!("delivery_estimation.today") : I18n.t!("delivery_estimation.tomorrow")
        amount = Utils.number_to_currency(country: country, number: self.amount)
        usd_amount =  Utils.number_to_usd(country: country, number: self.amount, as_string: true)

        {
            public_id: self.public_id,
            cart_amount: cart_amount,
            usd_cart_amount: usd_cart_amount,
            delivery_amount: delivery_amount,
            usd_delivery_amount: usd_delivery_amount,
            delivery_estimation: self.address_id ? delivery_estimation : nil,
            amount: amount,
            usd_amount: usd_amount,
            currency: CONSTANTS::CURRENCIES[currency][language]
        }
    end
end