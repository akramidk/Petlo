module Checkout::Summary
    def summary(country:, language:)
        cart_amount = Utils.number_to_currency(country: country, number: self.cart_amount)
        usd_cart_amount = Utils.number_to_usd(country: country, number: self.cart_amount, as_string: true)
        delivery_amount = Utils.number_to_currency(country: country, number: self.delivery_amount)
        usd_delivery_amount = Utils.number_to_usd(country: country, number: self.delivery_amount, as_string: true)
        #TODO should be better, and handles other countries
        delivery_estimation = delivery_estimation(country: country)
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

    private
    def delivery_estimation(country:)
        local_time = Utils.utc_to_local_time(country: country).hour

        if local_time >= 20 && local_time < 24
            I18n.t!("delivery_estimation.tomorrow")
        elsif local_time >= 24 && local_time < 10
            I18n.t!("delivery_estimation.today_1")
        elsif local_time >= 10 && local_time < 19
            I18n.t!("delivery_estimation.today_2")
        end
    end
end